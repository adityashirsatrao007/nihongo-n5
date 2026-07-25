export interface Conversation {
  id: string;
  title: string;
  paragraphs: {
    japanese: string;
    reading: string;
    romaji: string;
    english: string;
  }[];
  vocabulary: { word: string; reading: string; romaji: string; english: string }[];
}

export const conversationData: Conversation[] = [
  {
    id: 'c1',
    title: 'Self-Introduction',
    paragraphs: [
      {
        japanese: 'はじめまして、私はたろうと申します。',
        reading: 'はじめまして、わたしはたろうともうします。',
        romaji: 'Hajime mashite, watashi wa Tarou to moushimasu.',
        english: 'Nice to meet you, I am Tarou.',
      },
      {
        japanese: '日本から来ました。大学で日本語を勉強しています。',
        reading: 'にほんからきました。だいがくでにほんごをべんきょうしています。',
        romaji: 'Nihon kara kimashita. Daigaku de nihongo wo benkyou shiteimasu.',
        english: 'I came from Japan. I am studying Japanese at university.',
      },
      {
        japanese: '趣味は読書と映画を見ることです。',
        reading: 'しゅみはどくしょとえいがをみることです。',
        romaji: 'Shumi wa dokusho to eiga wo miru koto desu.',
        english: 'My hobbies are reading books and watching movies.',
      },
      {
        japanese: 'どうぞよろしくお願いします。',
        reading: 'どうぞよろしくおねがいします。',
        romaji: 'Douzo yoroshiku onegai shimasu.',
        english: 'Please take care of me.',
      },
    ],
    vocabulary: [
      { word: '私', reading: 'わたし', romaji: 'watashi', english: 'I / me' },
      { word: '申します', reading: 'もうします', romaji: 'moushimasu', english: 'am called (humble)' },
      { word: '日本', reading: 'にほん', romaji: 'nihon', english: 'Japan' },
      { word: '大学', reading: 'だいがく', romaji: 'daigaku', english: 'university' },
      { word: '勉強', reading: 'べんきょう', romaji: 'benkyou', english: 'study' },
      { word: '趣味', reading: 'しゅみ', romaji: 'shumi', english: 'hobby' },
      { word: '読書', reading: 'どくしょ', romaji: 'dokusho', english: 'reading books' },
      { word: '映画', reading: 'えいが', romaji: 'eiga', english: 'movie' },
    ],
  },
  {
    id: 'c2',
    title: 'My Daily Routine',
    paragraphs: [
      {
        japanese: '毎朝六時に起きます。',
        reading: 'まいあさろくじにおきます。',
        romaji: 'Maiasa rokuji ni okimasu.',
        english: 'I wake up at six o\'clock every morning.',
      },
      {
        japanese: '朝ごはんを食べてから、学校に行きます。',
        reading: 'あさごはんをたべてから、がっこうにいきます。',
        romaji: 'Asagohan wo tabete kara, gakkou ni ikimasu.',
        english: 'After eating breakfast, I go to school.',
      },
      {
        japanese: '午後五時まで勉強します。',
        reading: 'ごごごじまでべんきょうします。',
        romaji: 'Gogo goji made benkyou shimasu.',
        english: 'I study until five o\'clock in the afternoon.',
      },
      {
        japanese: '夜は友達と話したり、テレビを見たりします。',
        reading: 'よるはともだちとはなしたり、テレビをみたりします。',
        romaji: 'Yoru wa tomodachi to hanashitari, terebi wo mitari shimasu.',
        english: 'At night I talk with friends and watch TV.',
      },
    ],
    vocabulary: [
      { word: '毎朝', reading: 'まいあさ', romaji: 'maiasa', english: 'every morning' },
      { word: '起きる', reading: 'おきる', romaji: 'okiru', english: 'to wake up' },
      { word: '朝ごはん', reading: 'あさごはん', romaji: 'asagohan', english: 'breakfast' },
      { word: '学校', reading: 'がっこう', romaji: 'gakkou', english: 'school' },
      { word: '午後', reading: 'ごご', romaji: 'gogo', english: 'afternoon / PM' },
      { word: '友達', reading: 'ともだち', romaji: 'tomodachi', english: 'friend' },
      { word: '話す', reading: 'はなす', romaji: 'hanasu', english: 'to speak / to talk' },
      { word: '夜', reading: 'よる', romaji: 'yoru', english: 'night' },
    ],
  },
  {
    id: 'c3',
    title: 'My Hobbies',
    paragraphs: [
      {
        japanese: '私の趣味は写真を撮ることです。',
        reading: 'わたしのしゅみはしゃしんをとることです。',
        romaji: 'Watashi no shumi wa shashin wo toru koto desu.',
        english: 'My hobby is taking photos.',
      },
      {
        japanese: '休みの日にはいつもカメラを持って出かけます。',
        reading: 'やすみのひにはいつもカメラをもってでかけます。',
        romaji: 'Yasumi no hi ni wa itsumo kamera wo motte dekakemasu.',
        english: 'On my days off, I always go out with my camera.',
      },
      {
        japanese: '自然の風景を撮るのが大好きです。',
        reading: 'しぜんのふうけいをとるのがだいすきです。',
        romaji: 'Shizen no fuukei wo toru no ga daisuki desu.',
        english: 'I love taking photos of natural scenery.',
      },
      {
        japanese: '将来はプロの写真家になりたいです。',
        reading: 'しょうらいはプロのしゃしんかになりたいです。',
        romaji: 'Shourai wa pro no shashinka ni naritai desu.',
        english: 'In the future, I want to become a professional photographer.',
      },
    ],
    vocabulary: [
      { word: '写真', reading: 'しゃしん', romaji: 'shashin', english: 'photo / photograph' },
      { word: '撮る', reading: 'とる', romaji: 'toru', english: 'to take (photo)' },
      { word: '休み', reading: 'やすみ', romaji: 'yasumi', english: 'rest / day off' },
      { word: 'カメラ', reading: 'カメラ', romaji: 'kamera', english: 'camera' },
      { word: '自然', reading: 'しぜん', romaji: 'shizen', english: 'nature' },
      { word: '風景', reading: 'ふうけい', romaji: 'fuukei', english: 'scenery / landscape' },
      { word: '将来', reading: 'しょうらい', romaji: 'shourai', english: 'future' },
      { word: '写真家', reading: 'しゃしんか', romaji: 'shashinka', english: 'photographer' },
    ],
  },
  {
    id: 'c4',
    title: 'My Family',
    paragraphs: [
      {
        japanese: '私の家族は四人家族です。',
        reading: 'わたしのかぞくはよにんかぞくです。',
        romaji: 'Watashi no kazoku wa yonin kazoku desu.',
        english: 'My family has four people.',
      },
      {
        japanese: '父と母と妹がいます。',
        reading: 'ちちとははといもうとがいます。',
        romaji: 'Chichi to haha to imouto ga imasu.',
        english: 'I have my father, mother, and younger sister.',
      },
      {
        japanese: '父は会社員で、母は看護師です。',
        reading: 'ちちはかいしゃいんで、はははかんごしです。',
        romaji: 'Chichi wa kaishain de, haha wa kangoshi desu.',
        english: 'My father is a company employee, and my mother is a nurse.',
      },
      {
        japanese: '週末はよく家族みんなで食事に行きます。',
        reading: 'しゅうまつはよくかぞくみんなでしょくじにいきます。',
        romaji: 'Shuumatsu wa yoku kazoku minna de shokuji ni ikimasu.',
        english: 'On weekends, we often go out to eat as a family.',
      },
    ],
    vocabulary: [
      { word: '家族', reading: 'かぞく', romaji: 'kazoku', english: 'family' },
      { word: '父', reading: 'ちち', romaji: 'chichi', english: 'father (polite)' },
      { word: '母', reading: 'はは', romaji: 'haha', english: 'mother (polite)' },
      { word: '妹', reading: 'いもうと', romaji: 'imouto', english: 'younger sister' },
      { word: '会社員', reading: 'かいしゃいん', romaji: 'kaishain', english: 'company employee' },
      { word: '看護師', reading: 'かんごし', romaji: 'kangoshi', english: 'nurse' },
      { word: '週末', reading: 'しゅうまつ', romaji: 'shuumatsu', english: 'weekend' },
      { word: '食事', reading: 'しょくじ', romaji: 'shokuji', english: 'meal' },
    ],
  },
  {
    id: 'c5',
    title: 'Ordering at a Restaurant',
    paragraphs: [
      {
        japanese: 'すみません、メニューを見せてください。',
        reading: 'すみません、メニューをみせてください。',
        romaji: 'Sumimasen, menyuu wo misete kudasai.',
        english: 'Excuse me, please show me the menu.',
      },
      {
        japanese: '私はラーメンを注文します。',
        reading: 'わたしはラーメンをちゅうもんします。',
        romaji: 'Watashi wa raamen wo chuumon shimasu.',
        english: 'I will order ramen.',
      },
      {
        japanese: 'お水をください。',
        reading: 'おみずをください。',
        romaji: 'Omizu wo kudasai.',
        english: 'Please give me water.',
      },
      {
        japanese: 'お会計をお願いします。',
        reading: 'おかいけいをおねがいします。',
        romaji: 'Okaikei wo onegai shimasu.',
        english: 'The check please.',
      },
    ],
    vocabulary: [
      { word: 'メニュー', reading: 'メニュー', romaji: 'menyuu', english: 'menu' },
      { word: '見せる', reading: 'みせる', romaji: 'miseru', english: 'to show' },
      { word: '注文', reading: 'ちゅうもん', romaji: 'chuumon', english: 'order' },
      { word: 'ラーメン', reading: 'ラーメン', romaji: 'raamen', english: 'ramen' },
      { word: 'お水', reading: 'おみず', romaji: 'omizu', english: 'water (polite)' },
      { word: '会計', reading: 'かいけい', romaji: 'kaikei', english: 'bill / check' },
    ],
  },
  {
    id: 'c6',
    title: 'Asking for Directions',
    paragraphs: [
      {
        japanese: 'すみません、駅はどこですか？',
        reading: 'すみません、えきはどこですか？',
        romaji: 'Sumimasen, eki wa doko desu ka?',
        english: 'Excuse me, where is the station?',
      },
      {
        japanese: 'この道をまっすぐ行って、次の交差点を右に曲がってください。',
        reading: 'このみちをまっすぐいって、つぎのこうさてんをみぎにまがってください。',
        romaji: 'Kono michi wo massugu itte, tsugi no kousaten wo migi ni magatte kudasai.',
        english: 'Go straight on this road, and turn right at the next intersection.',
      },
      {
        japanese: '駅までどのくらいかかりますか？',
        reading: 'えきまでどのくらいかかりますか？',
        romaji: 'Eki made dono kurai kakarimasu ka?',
        english: 'How long does it take to the station?',
      },
      {
        japanese: '歩いて十分くらいです。',
        reading: 'あるいてじゅっぷんくらいです。',
        romaji: 'Aruite juppun kurai desu.',
        english: 'It is about ten minutes on foot.',
      },
    ],
    vocabulary: [
      { word: '駅', reading: 'えき', romaji: 'eki', english: 'station' },
      { word: '道', reading: 'みち', romaji: 'michi', english: 'road / street' },
      { word: 'まっすぐ', reading: 'まっすぐ', romaji: 'massugu', english: 'straight' },
      { word: '交差点', reading: 'こうさてん', romaji: 'kousaten', english: 'intersection' },
      { word: '右', reading: 'みぎ', romaji: 'migi', english: 'right' },
      { word: '曲がる', reading: 'まがる', romaji: 'magaru', english: 'to turn' },
      { word: '歩く', reading: 'あるく', romaji: 'aruku', english: 'to walk' },
    ],
  },
  {
    id: 'c7',
    title: 'Shopping',
    paragraphs: [
      {
        japanese: 'この靴はいくらですか？',
        reading: 'このくつはいくらですか？',
        romaji: 'Kono kutsu wa ikura desu ka?',
        english: 'How much are these shoes?',
      },
      {
        japanese: 'ちょっと高いですね。',
        reading: 'ちょっとたかいですね。',
        romaji: 'Chotto takai desu ne.',
        english: 'They are a bit expensive.',
      },
      {
        japanese: 'もう少し安いのはありますか？',
        reading: 'もうすこしやすいのはありますか？',
        romaji: 'Mou sukoshi yasui no wa arimasu ka?',
        english: 'Do you have something a bit cheaper?',
      },
      {
        japanese: 'これをください。',
        reading: 'これをください。',
        romaji: 'Kore wo kudasai.',
        english: 'I will take this, please.',
      },
    ],
    vocabulary: [
      { word: '靴', reading: 'くつ', romaji: 'kutsu', english: 'shoes' },
      { word: 'いくら', reading: 'いくら', romaji: 'ikura', english: 'how much' },
      { word: '高い', reading: 'たかい', romaji: 'takai', english: 'expensive / high' },
      { word: '安い', reading: 'やすい', romaji: 'yasui', english: 'cheap' },
      { word: '少し', reading: 'すこし', romaji: 'sukoshi', english: 'a little' },
      { word: 'これ', reading: 'これ', romaji: 'kore', english: 'this' },
    ],
  },
  {
    id: 'c8',
    title: 'Weekend Plans',
    paragraphs: [
      {
        japanese: '今週末は何をする予定ですか？',
        reading: 'こんしゅうまつはなにをするよていですか？',
        romaji: 'Konshuumatsu wa nani wo suru yotei desu ka?',
        english: 'What are your plans for this weekend?',
      },
      {
        japanese: '友達と映画を見に行くつもりです。',
        reading: 'ともだちとえいがをみにいくつもりです。',
        romaji: 'Tomodachi to eiga wo mi ni iku tsumori desu.',
        english: 'I plan to go watch a movie with my friend.',
      },
      {
        japanese: 'その後、新しいカフェに行ってみようと思います。',
        reading: 'そのあと、あたらしいカフェにいってみようとおもいます。',
        romaji: 'Sono ato, atarashii kafe ni itte miyou to omoimasu.',
        english: 'After that, I think I will try going to a new cafe.',
      },
      {
        japanese: '一緒に行きませんか？',
        reading: 'いっしょにいきませんか？',
        romaji: 'Issho ni ikimasen ka?',
        english: 'Would you like to go together?',
      },
    ],
    vocabulary: [
      { word: '今週末', reading: 'こんしゅうまつ', romaji: 'konshuumatsu', english: 'this weekend' },
      { word: '予定', reading: 'よてい', romaji: 'yotei', english: 'plan / schedule' },
      { word: 'つもり', reading: 'つもり', romaji: 'tsumori', english: 'intention / plan' },
      { word: '新しい', reading: 'あたらしい', romaji: 'atarashii', english: 'new' },
      { word: 'カフェ', reading: 'カフェ', romaji: 'kafe', english: 'cafe' },
      { word: '一緒', reading: 'いっしょ', romaji: 'issho', english: 'together' },
    ],
  },
  {
    id: 'c9',
    title: 'Talking About the Weather',
    paragraphs: [
      {
        japanese: '今日の天気はどうですか？',
        reading: 'きょうのてんきはどうですか？',
        romaji: 'Kyou no tenki wa dou desu ka?',
        english: 'How is the weather today?',
      },
      {
        japanese: 'とてもいい天気ですね。',
        reading: 'とてもいてんきですね。',
        romaji: 'Totemo ii tenki desu ne.',
        english: 'It is very nice weather.',
      },
      {
        japanese: '明日は雨が降るそうです。',
        reading: 'あしたはあめがふるそうです。',
        romaji: 'Ashita wa ame ga furu sou desu.',
        english: 'I heard it will rain tomorrow.',
      },
      {
        japanese: '傘を持っていったほうがいいですよ。',
        reading: 'かさをもっていったほうがいいですよ。',
        romaji: 'Kasa wo motte itta hou ga ii desu yo.',
        english: 'You should bring an umbrella.',
      },
    ],
    vocabulary: [
      { word: '天気', reading: 'てんき', romaji: 'tenki', english: 'weather' },
      { word: '今日', reading: 'きょう', romaji: 'kyou', english: 'today' },
      { word: '明日', reading: 'あした', romaji: 'ashita', english: 'tomorrow' },
      { word: '雨', reading: 'あめ', romaji: 'ame', english: 'rain' },
      { word: '降る', reading: 'ふる', romaji: 'furu', english: 'to fall (rain/snow)' },
      { word: '傘', reading: 'かさ', romaji: 'kasa', english: 'umbrella' },
    ],
  },
  {
    id: 'c10',
    title: 'At School',
    paragraphs: [
      {
        japanese: '今日の授業は何時からですか？',
        reading: 'きょうのじゅぎょうはなんじからですか？',
        romaji: 'Kyou no jugyou wa nanji kara desu ka?',
        english: 'What time does today\'s class start?',
      },
      {
        japanese: '九時から始まります。',
        reading: 'くじからはじまります。',
        romaji: 'Kuji kara hajimarimasu.',
        english: 'It starts at nine o\'clock.',
      },
      {
        japanese: 'この問題がよくわかりません。',
        reading: 'このもんだいがよくわかりません。',
        romaji: 'Kono mondai ga yoku wakarimasen.',
        english: 'I don\'t understand this problem very well.',
      },
      {
        japanese: '先生に質問してもいいですか？',
        reading: 'せんせいにしつもんしてもいいですか？',
        romaji: 'Sensei ni shitsumon shite mo ii desu ka?',
        english: 'May I ask the teacher a question?',
      },
    ],
    vocabulary: [
      { word: '授業', reading: 'じゅぎょう', romaji: 'jugyou', english: 'class / lesson' },
      { word: '何時', reading: 'なんじ', romaji: 'nanji', english: 'what time' },
      { word: '始まる', reading: 'はじまる', romaji: 'hajimaru', english: 'to start / to begin' },
      { word: '問題', reading: 'もんだい', romaji: 'mondai', english: 'problem / question' },
      { word: 'わかる', reading: 'わかる', romaji: 'wakaru', english: 'to understand' },
      { word: '先生', reading: 'せんせい', romaji: 'sensei', english: 'teacher' },
      { word: '質問', reading: 'しつもん', romaji: 'shitsumon', english: 'question' },
    ],
  },
];
