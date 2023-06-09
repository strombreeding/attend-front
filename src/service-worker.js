// service-worker.ts

import axios from "axios";
import { baseUrl } from "./App";
const getVersion = async () => {
  const res = await axios.get(`${baseUrl}/version`);
  return res.data;
};

const CACHE_NAME = "updater";
const CURRENT_VERSION = localStorage.getItem("version") === null ? getVersion() : localStorage.getItem("version");

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        // 필요한 파일들을 여기에 추가합니다.
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName.startsWith(CACHE_NAME) && cacheName !== CACHE_NAME;
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CHECK_VERSION") {
    checkVersion();
  }
});

async function checkVersion() {
  const res = await axios.get(`${baseUrl}/version`);
  const serverVersion = res.data;
  if (serverVersion !== CURRENT_VERSION) {
    self.skipWaiting();
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: "UPDATE_SW",
        });
      });
    });
    localStorage.setItem("version", serverVersion);
    document.getElementsByTagName("body")[0].innerHTML = `
        <h1 id = "reboot">재 실행 해주세요.</h1>
      `;
    alert("버전 업데이트가 필요합니다. 재 실행 해주세요.");
    return;
  }
  return;
}

self.skip;
