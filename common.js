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
  // 大分類・小分類を追加した新しいデータ構造
  const defaultData = [
    { id: "item1", name: "Shure SM58", mainCategory: "音響", subCategory: "マイク", maker: "Shure", status: "available", desc: "定番のダイナミックマイクです。" },
    { id: "item2", name: "Yamaha DZR12", mainCategory: "音響", subCategory: "スピーカー", maker: "Yamaha", status: "rented", desc: "高音質なパワードスピーカー。" },
    { id: "item3", name: "Yamaha QL1", mainCategory: "音響", subCategory: "音響卓", maker: "Yamaha", status: "available", desc: "デジタルミキシングコンソール。" },
    { id: "item4", name: "XLRケーブル 10m", mainCategory: "音響", subCategory: "ケーブル(音響)", maker: "Canare", status: "available", desc: "定番のマイクケーブルです。" },
    { id: "item5", name: "Aputure LS 600d Pro", mainCategory: "照明", subCategory: "LED Par", maker: "Aputure", status: "available", desc: "高出力なLED照明。" },
    { id: "item6", name: "ダボ付きハンガー", mainCategory: "照明", subCategory: "ハンガー", maker: "Kupo", status: "available", desc: "照明吊り下げ用ハンガー。" },
    { id: "item7", name: "DMXケーブル 10m", mainCategory: "照明", subCategory: "ケーブル(照明)", maker: "Canare", status: "available", desc: "照明制御用DMXケーブル。" },
    { id: "item8", name: "Sony FX3", mainCategory: "映像", subCategory: "カメラ", maker: "Sony", status: "available", desc: "シネマラインのフルサイズカメラ。" },
    { id: "item9", name: "Sachtler Ace M", mainCategory: "映像", subCategory: "三脚", maker: "Sachtler", status: "rented", desc: "ビデオ用三脚システム。" },
    { id: "item10", name: "DJI RS 3 Pro", mainCategory: "映像", subCategory: "ジンバル", maker: "DJI", status: "available", desc: "プロフェッショナル向けジンバル。" },
    { id: "item11", name: "SDIケーブル 20m", mainCategory: "映像", subCategory: "ケーブル（映像）", maker: "Canare", status: "available", desc: "映像伝送用BNCケーブル。" },
    { id: "item12", name: "並行電源ケーブル 10m", mainCategory: "電源", subCategory: "並行電源ケーブル", maker: "その他", status: "available", desc: "延長用の電源ケーブル。" },
    { id: "item13", name: "電源タップ 6個口", mainCategory: "電源", subCategory: "電源タップ", maker: "その他", status: "available", desc: "ステージ用電源タップ。" },
    { id: "item14", name: "Motorola IC-4110", mainCategory: "その他", subCategory: "無線機", maker: "Motorola", status: "available", desc: "特定小電力トランシーバー。" },
    { id: "item15", name: "養生テープ", mainCategory: "その他", subCategory: "その他", maker: "その他", status: "available", desc: "機材固定用の養生テープ。" }
  ];

  let currentData = JSON.parse(localStorage.getItem('equipmentData') || 'null');
  
  // 古いデータ構造（mainCategoryがない場合）はリセットして新しいデータをセット
  if (!currentData || currentData.length === 0 || !currentData[0].mainCategory) {
    localStorage.setItem('equipmentData', JSON.stringify(defaultData));
    localStorage.setItem('cartItemIds', JSON.stringify([]));
    localStorage.setItem('rentedItemIds', JSON.stringify([]));
  }
}
