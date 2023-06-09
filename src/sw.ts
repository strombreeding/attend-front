// serviceWorker.ts 파일

// 서비스 워커 등록
export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    console.log("서비스워커 시작");
    window.addEventListener("load", () => {
      console.log("로드");
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }
}
