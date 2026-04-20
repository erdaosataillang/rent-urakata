// 1. 共通のサイドバーを読み込む関数
function loadSidebar(activePageId) {
  fetch('sidebar.html')
    .then(response => {
      if (!response.ok) throw new Error('サイドバーの読み込みエラー');
      return response.text();
    })
    .then(data => {
      document.getElementById('sidebar-container').innerHTML = data;
      // 現在開いているページに合わせてメニューの背景色を変更する
      const activeLink = document.querySelector(`.nav-item[data-page="${activePageId}"]`);
      if (activeLink) activeLink.classList.add('active');
    })
    .catch(error => {
      console.error(error);
      document.getElementById('sidebar-container').innerHTML = '<div style="padding: 24px;">メニューを読み込めませんでした。ローカル環境の場合はサーバーを立ち上げてください。</div>';
    });
}

// 2. 機材データなどを初期化する関数
function initCommonState() {
  const defaultData = [
    { id: "item1", name: "Sony α7 IV", category: "カメラ", maker: "Sony", status: "available", desc: "高画質なフルサイズミラーレスカメラ。動画撮影にも最適です。" },
    { id: "item2", name: "DJI RS 3 Pro", category: "ジンバル", maker: "DJI", status: "rented", desc: "プロフェッショナル向けのジンバルスタビライザー。" },
    { id: "item3", name: "Sennheiser MKE 600", category: "マイク", maker: "Sennheiser", status: "available", desc: "クリアな音質で録音できるショットガンマイク。" },
    { id: "item4", name: "Aputure 300d II", category: "照明", maker: "Aputure", status: "available", desc: "強力で自然な光を作り出すLEDビデオライト。" },
    { id: "item5", name: "MacBook Pro M3", category: "PC", maker: "Apple", status: "rented", desc: "動画編集もサクサクこなせる高性能ノートPC。" },
    { id: "item6", name: "HDMIケーブル 10m", category: "ケーブル", maker: "その他", status: "available", desc: "長距離伝送可能なHDMIケーブルです。" }
  ];
  if (!localStorage.getItem('equipmentData')) localStorage.setItem('equipmentData', JSON.stringify(defaultData));
  if (!localStorage.getItem('cartItemIds')) localStorage.setItem('cartItemIds', JSON.stringify([]));
  if (!localStorage.getItem('rentedItemIds')) localStorage.setItem('rentedItemIds', JSON.stringify([]));
}
