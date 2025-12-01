import { AppConfig } from './types';

// OTOMATİK OLARAK ikas-kategoriler.xlsx DOSYANIZDAN ÜRETİLMİŞTİR
// Bu dosya, Excel'deki kategori, beden, ölçü ve kumaş özelliklerini birebir yansıtacak şekilde güncellenmiştir.

export const CONFIG: AppConfig = {
  brandName: "YOUR BRAND",
  categories: [
    {
      id: "pantolon",
      label: "PANTOLON",
      silhouetteImage: "https://wsrv.nl/?url=https://drive.google.com/uc?id=152RwRgl_tBoDmw8tFeesRuMcmzN0_hol",
      sizes: ["34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62"],
      measurements: ["Boy", "Bel", "Basen", "Paça", "İç Bacak"],
      fabricProperties: ["Bel", "Boy", "Kumaş Tipi", "Kalınlık", "Dokuma Tipi"]
    },
    {
      id: "alt-ust-takim",
      label: "ALT-ÜST TAKIM",
      silhouetteImage: "https://wsrv.nl/?url=https://drive.google.com/uc?id=1weyNVWQo628CEw9eOdykj7XqR0pwnw6N",
      sizes: ["34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62"],
      measurements: ["Üst Parça Boy", "Üst Parça Göğüs", "Alt Parça Boy", "Alt Parça Bel", "Alt Parça Basen"],
      fabricProperties: ["Desen", "Kalıp", "Kumaş Tipi", "Boy", "Dokuma Tipi"]
    },
    {
      id: "esofman-takimi",
      label: "EŞOFMAN TAKIMI",
      silhouetteImage: "https://wsrv.nl/?url=https://drive.google.com/uc?id=1zX6AOXXUyMeHWwPGtnfwUrCO-RCVMcp9",
      sizes: ["34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62"],
      measurements: ["Üst Parça Boy", "Üst Parça Göğüs", "Alt Parça Boy", "Alt Parça Bel", "Alt Parça Basen"],
      fabricProperties: ["Kumaş Tipi", "Alt-Üst Takım", "Boy", "Dokuma Tipi", "Kalıp"]
    },
    {
      id: "ceket",
      label: "CEKET",
      silhouetteImage: "https://wsrv.nl/?url=https://drive.google.com/uc?id=1uvqKUe4qXltIpye5lbm0J0LuLUj_VKu3",
      sizes: ["34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62"],
      measurements: ["Boy", "Göğüs", "Alt Genişlik", "Kol Uzunluk", "Kol Genişlik"],
      fabricProperties: ["Kumaş Tipi", "Boy", "Kalınlık", "Dokuma Tipi", "Kalıp"]
    },
    {
      id: "etek",
      label: "ETEK",
      silhouetteImage: "https://wsrv.nl/?url=https://drive.google.com/uc?id=1edNCdC58JAY8Bb6L71OTNZbcL9ItC6Rd",
      sizes: ["34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62"],
      measurements: ["Boy", "Bel", "Basen", "Alt Genişlik"],
      fabricProperties: ["Boy", "Kumaş Tipi", "Dokuma Tipi", "Kalınlık", "Astar Durumu"]
    },
    {
      id: "elbise",
      label: "ELBİSE",
      silhouetteImage: "https://wsrv.nl/?url=https://drive.google.com/uc?id=1Vrxo6EKJNmv3gtqz1E1YRiLYZVLNjLk4",
      sizes: ["34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62"],
      measurements: ["Boy", "Göğüs", "Alt Genişlik", "Bel", "Kol Uzunluk"],
      fabricProperties: ["Kumaş Tipi", "Boy", "Kalıp", "Astar Durumu", "Ürün Detayı"]
    },
    {
      id: "t-shirt",
      label: "T-SHIRT",
      silhouetteImage: "https://wsrv.nl/?url=https://drive.google.com/uc?id=1HhmhPnhuxoRv4reiIyPZVYIQBI70NZNw",
      sizes: ["34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62"],
      measurements: ["Boy", "Göğüs", "Alt Genişlik", "Kol Genişlik"],
      fabricProperties: ["Dokuma Tipi", "Kumaş Tipi", "Boy", "Yaka Tipi", "Kalıp"]
    },
    {
      id: "kaban",
      label: "KABAN",
      silhouetteImage: "https://wsrv.nl/?url=https://drive.google.com/uc?id=1WEbsay95MqbXUwQVOKK3L6bQRnvuPHoz",
      sizes: ["34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62"],
      measurements: ["Boy", "Göğüs", "Alt Genişlik", "Kol Uzunluk", "Kol Genişlik"],
      fabricProperties: ["Kumaş Tipi", "Kalıp", "Boy", "Dokuma Tipi", "Kalınlık"]
    },
    {
      id: "mont",
      label: "MONT",
      silhouetteImage: "https://wsrv.nl/?url=https://drive.google.com/uc?id=1s_7GkGvqAWv3Muk7jQygaJSZk7bZdjgQ",
      sizes: ["34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62"],
      measurements: ["Boy", "Göğüs", "Alt Genişlik", "Kol Uzunluk", "Kol Genişlik"],
      fabricProperties: ["Kumaş Tipi", "Boy", "Kapama Şekli", "Dolgu Materyali", "Kalıp"]
    },
    {
      id: "sort",
      label: "ŞORT",
      silhouetteImage: "https://wsrv.nl/?url=https://drive.google.com/uc?id=1R5rTFSVY6-3DNvbgKuyV3SFUX8Hl9qFZ",
      sizes: ["34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62"],
      measurements: ["Boy", "Bel", "Basen", "Paça", "İç Bacak"],
      fabricProperties: ["Kumaş Tipi", "Bel", "Boy", "Dokuma Tipi", "Kalıp"]
    }
  ]
};

// Excel'deki property tanımlarınızdan OTOMATİK türetilen dropdown seçenekleri
export const FABRIC_OPTIONS: Record<string, string[]> = {
  "Alt-Üst Takım": ["Atlet-Şort", "Atlet-Tayt", "Gölek-Şort", "Gömlek-Pantolon", "Gömlek-Şort", "Gömlek-Tayt", "Kapüşonlu-Eşofman", "Sweat-Etek", "Sweat-Eşofman", "Sweat-Şort", "Sweat-Tayt", "Takım", "T-shirt-Pantolon", "T-shirt-Şort"],
  "Astar Durumu": ["Astarlı", "Astarsız"],
  "Bel": ["Düşük Bel", "Esnek Bel", "Jogger Lastik Bel", "Korse Kemerli", "Kuşaklı", "Kuşaklı Lastikli", "Lastik Bel", "Lastikli", "Normal Bel", "Orta Bel", "Paperbag", "Süper Yüksek Bel", "Yüksek Bel"],
  "Boy": ["Bilek", "Boyu", "Crop", "Diz Boyu", "Ekstra Kısa / Süper Mini", "Extra Uzun", "Kapri", "Kısa", "Kısa / Mini", "Long", "Maksi", "Maxi", "Midi", "Mini", "Mini Boy", "Normal Boy", "Orijinal Boy", "Regular", "Standart", "Tek Kişilik", "Tekli", "Uzun", "Çift Kişilik", "Çiftli", "Üçlü", "Üst Diz", "Üç Kişilik", "Belirtilmemiş"],
  "Desen": ["Ajurlu", "Animal", "Araba", "Armürlü", "Baklava", "Balık sırtı", "Baskılı", "Batik", "Degrade", "Desenli", "Dokulu", "Düz", "Ekose / Kareli", "Eskitme", "Etnik", "Galaksi", "Geometrik", "Gökkuşağı", "Göz", "Hayvanlı", "Kalp", "Kareli", "Kazayağı", "Kılçık", "Klasik", "Leopar", "Love", "Mix", "Nakışlı / İşlemeli", "Nope", "Nötr", "Pamuk Desenli", "Puantiyeli", "Renk Bloklu / Colorblock", "Ribana", "Rifle", "Rölyefli", "Saç Örgü", "Simli", "Slogan", "Soyut", "Sulu Boya", "Taşlı", "Timsah", "Tropikal", "Varaklı", "Yazı Karekterli / Motto", "Yılbaşı", "Zigzag", "Çiçekli", "Çini", "Çizgili", "Şal Desen"],
  "Dokuma Tipi": ["Batik", "Beli Lastikli", "Blok", "Boyalı", "Büzgülü", "Büzgülü / Piliseli", "Cepsiz", "Cepsiz - Fermuarlı", "Corn", "Coton", "Dacron", "Dalgıç/Scuba", "Denim", "Dobby", "Dokuma", "Dore", "Double Face", "Düğmeli", "Düz", "Düz Dokuma", "Emprime", "File", "Finike", "Fitilli", "Flanel", "Floral", "Flok Baskı", "Flora", "Fularlı", "Füme", "Gabardin", "Gabardin Denim", "Gabardin Penye", "Gauze", "Gofre", "Gömlek", "Güpür", "Hacimli", "Hasır", "Havlu", "Hırka", "İki İplik", "İki Katlı", "İki Renkli", "İnce", "İnterlok", "Jakarlı", "Jakar", "Jakar Denim", "Jersey", "Jile", "Kadife", "Kapitone", "Kareli", "Kaşe", "Keten", "Keten Karışımlı", "Keten görünümlü", "Koton", "Krep", "Kroşe", "Kumaş", "Kürk", "Lacoste", "Lacost", "Lacoste Pike", "Likralı 2 İplik", "Likralı 2 İplik Şardonsuz", "Likralı Penye Süprem", "Likralı Pike", "Likralı Süprem", "Linen", "Lycra", "Melfi", "Melton", "Mesh", "Micro", "Mikro", "Mikro Likralı İnterlok", "Mikro Sherpa", "Modal", "Müslin", "Nancy", "Organze", "Ottoman", "Pamuk", "Pamuk Denim", "Pamuk Gabardin", "Pamuk karışımlı", "Pamuk Penye", "Pamuk Poplin", "Pamuk Süprem", "Pamuk Vual", "Penye", "Penye Süprem", "Pike", "Pike Süprem", "Pişmiş", "Plise", "Polar", "Poliviskon", "Polyester", "Polyester Denim", "Polyester Kaşkorse", "Polyester Karışımlı", "Poplin", "Punto Milano", "Rahat", "Rahat Kesim", "Rahat Örme", "Rahat Penye", "Rejenere", "Rejenere Kaşkorse", "Rejenere Stops", "Rejenere Şardonlu", "Ribana", "Ribana Pike", "Rigid", "Rigid Denim", "Rigid Gabardin", "Rigid Penye", "Rigid Pike", "Röfle", "Sandy", "Saten", "Scuba", "Selanik", "Sıcak Tutan", "Spor", "Süet", "Süprem", "Şardonlu", "Şardonlu 3 İplik", "Şeritli", "Şifon", "Şönil", "Tafta", "Tek Kat", "Tencel", "Triko", "Trilobal", "Tül", "Tüvit", "Twill", "Velvet", "Viskon", "Viskon Denim", "Viskon Gabardin", "Viskon Pike", "Viskon Poplin", "Viskon Ribana", "Viskon Süprem", "Viskoz", "Voile", "Vual", "Waffle", "Yumuşak", "Yumoş", "Yün", "Yünlü", "Zibro", "Zibro Denim", "Zibro Gabardin", "Zibro Pike", "Zibro Süprem", "Zibro Viskon", "Zibro Vual", "Zibro Yün", "Zigzag", "Zımparalı", "Şardonlu Denim", "Şardonlu Penye", "Şardonlu Pike", "Şardonlu Süprem", "Şardonlu Viskon", "Şardonlu Yün", "Şardonlu Yumoş", "Şardonlu Zibro", "Şardonlu Zibro Denim", "Şardonlu Zibro Gabardin", "Şardonlu Zibro Pike", "Şardonlu Zibro Süprem", "Şardonlu Zibro Viskon", "Şardonlu Zibro Yün", "Şardonlu Zibro Yumoş", "Şardonlu Zibro Zibro", "Şardonlu Zibro Zibro Denim", "Şardonlu Zibro Zibro Gabardin", "Şardonlu Zibro Zibro Pike", "Şardonlu Zibro Zibro Süprem", "Şardonlu Zibro Zibro Viskon", "Şardonlu Zibro Zibro Yün", "Şardonlu Zibro Zibro Yumoş", "Belirtilmemiş"],
  "Dolgu Materyali": ["Dolgu Elyaf", "Dolum", "Hafif elyaf", "Kuş Tüyü", "Kuş Tüyü Karışımlı", "Pamuk", "Polyester", "Yoğun Elyaf"],
  "Kalınlık": ["Çok Kalın", "İnce", "Kalın", "Orta"],
  "Kalıp": ["A Form", "A Kesim", "A-line / Kloş", "Anvelop", "Asimetrik", "Balık", "Balon", "Balloon", "Basic", "Bermuda", "Biker", "Blazer", "Bodycon", "Bol", "Boyfriend", "Boxer", "Boxy", "Büyük Beden", "Carrot", "Ceket", "Culotte", "Dar", "Desenli", "Drapeli", "Düz", "Ek Özellik Mevcut Değil", "Esnek", "Extra Esnek", "Extra Yumuşak", "Fit", "Form Fit", "Geniş", "Göğüs Detaylı", "Gömlek Elbise", "Havuç/Şalvar", "Jile", "Jogger", "Kalem", "Kare", "Kat Kat", "Kiloş", "Klasik", "Kloş", "Klost", "Kolsuz", "Korsaj", "Kruvaze", "Kruvaze / Anvelop", "Kusursuz", "Kuşaklı", "Kuşaklı - Lastikli", "Kuşaklı Lastikli", "Loose", "Loose Fit", "Mom", "Normal", "Oversize", "Piliseli", "Pileli", "Prenses", "Push up", "Relaxed", "Relaxed Fit", "Regular", "Regular Fit", "Seamless", "Skinny", "Slim", "Slim Fit", "Straight", "String", "Su itici", "T-Shirt Elbise", "Tailored", "Toparlayıcı", "Trench", "Uzun", "Uzunluk Ayarlı", "Wide Leg", "Yırtmaçlı", "Yuvarlak", "Çan", "Çıkarılabilir Kemerli", "Şişme", "Şort Etek", "Şort Elbise"],
  "Kapama Şekli": ["Bağcıklı", "Bağcıklı - Lastikli", "Bel Lastikli", "Bel Kuşaklı", "Bel Lastikli - Fermuarlı", "Çıt Çıt Kapama Paça", "Çıt çıt + Fermuar", "Çıtçıt", "Düğmeli", "Full Düğme Kapama", "Full Fermuar Kapama", "Kruvaze", "Lastikli", "Lastiksiz Paça", "Yarım Fermuar", "Önden Fermuarlı"],
  "Kumaş Tipi": ["2 İplik", "2 iplik openend", "2 iplik penye", "2 İplik Rejenere", "2 İplik Şardonsuz", "3 iplik penye", "30/2 penye süprem", "Bürümcük", "Comfort", "Denim", "Dokuma", "Dantel", "Düz Dokuma", "Finike", "Fırçalı Scuba", "Fırçalı Rejenere Kaşkorse", "Gabardin", "İnterlok", "Kaşe", "Keten", "Keten karışımlı", "Keten görünümlü", "Likralı 2 İplik", "Likralı 2 İplik Şardonsuz", "Likralı Penye Süprem", "Ottoman", "Paraşüt", "Pike", "Poliviskon", "Ribana", "Rigid", "Shally", "Stretch", "Suni Deri", "Triko", "Waffle", "Örme", "Belirtilmemiş"],
  "Yaka Tipi": ["Balıkçı Yaka", "Bisiklet Yaka", "Boat Yaka", "Busto Yaka", "Dantel Yaka", "Degaje Yaka", "Dik Yaka", "Hakim Yaka", "Halter Yaka", "Kapüşonlu", "Kayık Yaka", "Klasik Yaka", "Kruvaze Yaka", "Kürklü Yaka", "Likrali Yaka", "Mao Yaka", "Omuzu Açık", "Oturaklı Yaka", "Polo Yaka", "Sıfır Yaka", "Spagetti Askılı", "Straplez", "Su Yolu Yaka", "Şal Yaka", "U Yaka", "V Yaka", "Yakalı", "Yuvarlak Yaka", "Çapraz Yaka", "Çizgili Yaka", "Çift Kat Yaka", "Şapkalı Yaka"],
  "Ürün Detayı": ["A Kesim", "A Pileli", "Aplik Aplike", "Asimetrik", "Astarlı", "Bağcıklı", "Balon Kol", "Balon Paça", "Balonlu", "Baskılı", "Beli Lastikli", "Beli Kuşaklı", "Beli lastikli", "Belirtilmemiş", "Büzgülü", "Cepli", "Cepsiz", "Çapraz", "Çıkarılabilir Astar", "Çıtçıtlı", "Dar Paça", "Desenli", "Dikiş Detaylı", "Düğmeli", "Düşük Omuz", "Etek Ucu Volanlı", "Fermuarlı", "Fırfırlı", "Geniş Paça", "Gömlek Yaka", "Gömlek Elbise", "Gözlük Cep", "İki Renkli", "İkili Takım", "İncili", "Kapüşonlu", "Kat Kat", "Kemerli", "Klasik Paça", "Kloş Etek", "Kol Detaylı", "Kol Lastikli", "Kruvaze", "Kuşaklı", "Kuplu", "Lastikli Paça", "Lastiksiz Paça", "Omuz Detaylı", "Omuz Vatkalı", "Oversize", "Paça Lastikli", "Paça Yırtmaçlı", "Pensli", "Pileli", "Piliseli", "Püsküllü", "Renk Bloklu", "Simli", "Şal Yaka", "Şeritli", "Şifon Garnili", "Şifon Kollu", "Şort Görünümlü Etek", "Şortlu", "Toparlayıcı", "Triko Detaylı", "Volanlı", "Yamçılı", "Yandan Fermuarlı", "Yanları Yırtmaçlı", "Yarım Balıkçı", "Yırtmaçlı", "Zımbalı", "Önü Düğmeli", "Örgü Detaylı", "Özel Kesim", "Üstü Dantel", "Ütü istemez", "Ek Özellik Mevcut Değil", "Ekose", "Kargo Paça", "Kontrast Dikişli", "Kuşak Detaylı", "Tüylü", "Varak Baskılı", "Yıkamalı", "İşlemeli", "İspanyol Paça", "Serin tutar", "Süper Esnek", "Süper Yüksek Bel", "Suya Dayanıklı", "İç Göstermeyen", "İncelten Etki", "İnce Askılı", "İkili Kol Detaylı", "Kruvaze / Anvelop", "Gizli Patlı", "Gipeli", "Gizli Fermuarlı", "Geniş Manşetli", "Astarı Çıkarılabilir", "Ekstra Uzun Kol", "İçten Kemerli", "Kalın Askılı", "Kısa Askılı", "Oversize Kesim", "Paça Fermuarlı", "Şardonlu", "Yarım Fermuarlı", "Yüksek Bel", "Balon Kollu", "Ekstra Cepli", "Kemer Tokalı", "Çapraz Bağlamalı", "Önden Düğmeli", "Arka Fermuarlı", "Yan Cepli", "Örgü", "Yırtık Detaylı", "Perl Detaylı", "Yazı Karekterli / Motto", "Polo Yaka", "Kruvaze Düğmeli", "Ekstra Uzun Paça", "Manşetli", "Balloon Paça", "Sırt Dekolteli", "Göğüs Dekolteli", "Tül Detaylı", "Etek Ucu Dantelli", "Etek Ucu Tüylü", "Çapraz Yaka", "Kavisli Paça", "Kaplamalı Düğme", "Nervürlü", "Blok Renkli", "Çapraz Fermuarlı", "Balıkçı Yaka", "Dantel Garnili", "Organze Kollu", "Brode Detaylı", "Perl Nakışlı", "Volan Kollu", "Pliseli Etek", "Kloş Kesim", "Balon Etek", "Lastikli Bel", "Çıtçıtlı Paça", "Ekstra Geniş Paça", "Gizli Düğmeli", "Sökük Detaylı", "Etek Ucu Asimetrik", "Yüksek Bel Paça", "Çıtçıtlı Yaka", "Biker Paça", "Ekoseli", "Baskı Detaylı", "Şerit Detaylı", "Yakası Düğmeli", "Yarım Balıkçı", "Kare Yaka", "Kalp Yaka", "Boğazlı", "Dantel Kollu", "Aplik Aplike", "Çıtçıtlı", "Örme Detaylı", "İncili", "Şeritli"]
};
