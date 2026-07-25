import { GrammarPoint } from '../types/grammar';

export const grammarData: GrammarPoint[] = [
  {
    id: 'g1', title: 'Basic X は Y です',
    pattern: 'N1 は N2 です', patternReading: 'N1 wa N2 desu',
    meaning: 'A is B',
    usage: 'The most basic sentence structure. は is the topic marker, です means "is/am/are".',
    examples: [
      { japanese: '私は学生です。', reading: 'わたしはがくせいです。', english: 'I am a student.' },
      { japanese: 'これは本です。', reading: 'これはほんです。', english: 'This is a book.' },
    ],
  },
  {
    id: 'g2', title: 'Question は ですか',
    pattern: 'N1 は N2 ですか', patternReading: 'N1 wa N2 desu ka',
    meaning: 'Is A B?',
    usage: 'Add か at the end to make a question.',
    examples: [
      { japanese: 'あなたは学生ですか。', reading: 'あなたはがくせいですか。', english: 'Are you a student?' },
      { japanese: 'これは本ですか。', reading: 'これはほんですか。', english: 'Is this a book?' },
    ],
  },
  {
    id: 'g3', title: 'Negative では ありません',
    pattern: 'N1 は N2 では ありません', patternReading: 'N1 wa N2 dewa arimasen',
    meaning: 'A is not B',
    usage: 'Replace です with では ありません to make negative. Casual: じゃ ありません.',
    examples: [
      { japanese: '私は学生ではありません。', reading: 'わたしはがくせいではありません。', english: 'I am not a student.' },
      { japanese: 'これは本じゃありません。', reading: 'これはほんじゃありません。', english: 'This is not a book.' },
    ],
  },
  {
    id: 'g4', title: 'Particle の (possessive)',
    pattern: 'N1 の N2', patternReading: 'N1 no N2',
    meaning: 'N2 of N1 / N1\'s N2',
    usage: 'の connects two nouns. The first noun modifies the second.',
    examples: [
      { japanese: '私の本です。', reading: 'わたしのほんです。', english: 'It is my book.' },
      { japanese: '大学の先生。', reading: 'だいがくのせんせい。', english: 'University teacher.' },
    ],
  },
  {
    id: 'g5', title: 'Particle を (object marker)',
    pattern: 'N を V', patternReading: 'N wo V',
    meaning: 'Marks the direct object of an action verb',
    usage: 'を is placed after the object that receives the action.',
    examples: [
      { japanese: '本を読みます。', reading: 'ほんをよみます。', english: 'I read a book.' },
      { japanese: '水を飲みます。', reading: 'みずをのみます。', english: 'I drink water.' },
    ],
  },
  {
    id: 'g6', title: 'Particle に (time/destination)',
    pattern: 'Time に / Place に', patternReading: 'Time ni / Place ni',
    meaning: 'At [time] / To [place]',
    usage: 'に marks a specific point in time or a destination.',
    examples: [
      { japanese: '七時に起きます。', reading: 'しちじにおきます。', english: 'I wake up at 7 o\'clock.' },
      { japanese: '学校に行きます。', reading: 'がっこうにいきます。', english: 'I go to school.' },
    ],
  },
  {
    id: 'g7', title: 'Particle で (location of action)',
    pattern: 'Place で V', patternReading: 'Place de V',
    meaning: 'At [place] (doing an action)',
    usage: 'で marks where an action takes place.',
    examples: [
      { japanese: '図書館で勉強します。', reading: 'としょかんでべんきょうします。', english: 'I study at the library.' },
      { japanese: '公園で遊びます。', reading: 'こうえんであそびます。', english: 'I play at the park.' },
    ],
  },
  {
    id: 'g8', title: 'Particle へ (direction)',
    pattern: 'Place へ V', patternReading: 'Place e V',
    meaning: 'Toward [place]',
    usage: 'へ indicates direction. It reads as "e" even though the hiragana is "he".',
    examples: [
      { japanese: '東京へ行きます。', reading: 'とうきょうへいきます。', english: 'I go to Tokyo.' },
      { japanese: '日本へ来ました。', reading: 'にほんへきました。', english: 'I came to Japan.' },
    ],
  },
  {
    id: 'g9', title: 'Particle と (and/with)',
    pattern: 'N1 と N2 / Person と V', patternReading: 'N1 to N2 / Person to V',
    meaning: 'A and B / Together with [person]',
    usage: 'と connects two nouns like "and". Also used to mean "together with" someone.',
    examples: [
      { japanese: '本とペン。', reading: 'ほんとぺん。', english: 'A book and a pen.' },
      { japanese: '友達と映画を見ます。', reading: 'ともだちとえいがをみます。', english: 'I watch a movie with my friend.' },
    ],
  },
  {
    id: 'g10', title: 'Particle から (from/because)',
    pattern: 'Place から / Reason から', patternReading: 'Place kara / Reason kara',
    meaning: 'From [place] / Because [reason]',
    usage: 'から can mean "from" (starting point) or "because" (reason).',
    examples: [
      { japanese: '駅から歩きました。', reading: 'えきからあるきました。', english: 'I walked from the station.' },
      { japanese: '忙しいから、行きません。', reading: 'いそがしいから、いきません。', english: 'Because I\'m busy, I won\'t go.' },
    ],
  },
  {
    id: 'g11', title: 'Particle まで (until/up to)',
    pattern: 'Place まで / Time まで', patternReading: 'Place made / Time made',
    meaning: 'Until [place/time]',
    usage: 'まで indicates the end point of an action in time or space.',
    examples: [
      { japanese: '九時まで働きます。', reading: 'くじまではたらきます。', english: 'I work until 9 o\'clock.' },
      { japanese: '駅まで歩きます。', reading: 'えきまであるきます。', english: 'I walk to the station.' },
    ],
  },
  {
    id: 'g12', title: 'Verb ます Form (polite)',
    pattern: 'Verb stem + ます', patternReading: 'Verb stem + masu',
    meaning: 'Polite present/future verb',
    usage: 'The ます form is the polite way to say verbs. For ru-verbs: drop る + ます. For u-verbs: change final u to i + ます.',
    examples: [
      { japanese: '食べます。', reading: 'たべます。', english: 'I eat / I will eat.' },
      { japanese: '飲みます。', reading: 'のみます。', english: 'I drink / I will drink.' },
      { japanese: '行きます。', reading: 'いきます。', english: 'I go / I will go.' },
    ],
  },
  {
    id: 'g13', title: 'Verb ません Form (negative)',
    pattern: 'Verb stem + ません', patternReading: 'Verb stem + masen',
    meaning: 'Polite negative verb (do not)',
    usage: 'Replace ます with ません to make the negative.',
    examples: [
      { japanese: '食べません。', reading: 'たべません。', english: 'I do not eat.' },
      { japanese: '行きません。', reading: 'いきません。', english: 'I do not go.' },
    ],
  },
  {
    id: 'g14', title: 'Verb ました Form (past)',
    pattern: 'Verb stem + ました', patternReading: 'Verb stem + mashita',
    meaning: 'Polite past tense verb (did)',
    usage: 'Replace ます with ました to make past tense.',
    examples: [
      { japanese: '食べました。', reading: 'たべました。', english: 'I ate.' },
      { japanese: '見ました。', reading: 'みました。', english: 'I saw / I watched.' },
    ],
  },
  {
    id: 'g15', title: 'Verb ませんでした (past negative)',
    pattern: 'Verb stem + ませんでした', patternReading: 'Verb stem + masen deshita',
    meaning: 'Polite past negative (did not)',
    usage: 'Replace ます with ませんでした.',
    examples: [
      { japanese: '食べませんでした。', reading: 'たべませんでした。', english: 'I did not eat.' },
      { japanese: '行きませんでした。', reading: 'いきませんでした。', english: 'I did not go.' },
    ],
  },
  {
    id: 'g16', title: 'Particle が (subject marker)',
    pattern: 'N が', patternReading: 'N ga',
    meaning: 'Subject marker / But',
    usage: 'が marks the subject. Often used with 好き, わかる, 欲しい. Also means "but" when connecting sentences.',
    examples: [
      { japanese: '日本語がわかります。', reading: 'にほんごがわかります。', english: 'I understand Japanese.' },
      { japanese: '猫が好きです。', reading: 'ねこがすきです。', english: 'I like cats.' },
    ],
  },
  {
    id: 'g17', title: 'い-Adjectives',
    pattern: 'Adjective + Noun / Adjective + です', patternReading: 'Adjective + Noun / Adjective + desu',
    meaning: 'Describing words ending in い',
    usage: 'い-adjectives go directly before nouns. They can also end a sentence with です. To make negative: replace い with くないです.',
    examples: [
      { japanese: '大きい犬。', reading: 'おおきいいぬ。', english: 'Big dog.' },
      { japanese: 'この本は安いです。', reading: 'このほんはやすいです。', english: 'This book is cheap.' },
      { japanese: '高くないです。', reading: 'たかくないです。', english: 'It is not expensive.' },
    ],
  },
  {
    id: 'g18', title: 'な-Adjectives',
    pattern: 'Adj + な + Noun / Adj + です', patternReading: 'Adj + na + Noun / Adj + desu',
    meaning: 'Describing words that need な before nouns',
    usage: 'な-adjectives need な when placed before a noun. At the end of a sentence they just take です.',
    examples: [
      { japanese: '元気な人。', reading: 'げんきなひと。', english: 'Energetic person.' },
      { japanese: 'この町は有名です。', reading: 'このまちはゆうめいです。', english: 'This town is famous.' },
    ],
  },
  {
    id: 'g19', title: 'あります / います (existence)',
    pattern: 'Place に N が あります/います', patternReading: 'Place ni N ga arimasu/imasu',
    meaning: 'There is/are [thing] at [place]',
    usage: 'あります is for inanimate objects. います is for living things.',
    examples: [
      { japanese: '机の上に本があります。', reading: 'つくえのうえにほんがあります。', english: 'There is a book on the desk.' },
      { japanese: '公園に猫がいます。', reading: 'こうえんにねこがいます。', english: 'There is a cat in the park.' },
    ],
  },
  {
    id: 'g20', title: 'Particle も (also/too)',
    pattern: 'N も', patternReading: 'N mo',
    meaning: 'Also / Too',
    usage: 'も replaces は, が, を to mean "also" or "too".',
    examples: [
      { japanese: '私も学生です。', reading: 'わたしもがくせいです。', english: 'I am also a student.' },
      { japanese: '猫も好きです。', reading: 'ねこもすきです。', english: 'I like cats too.' },
    ],
  },
  {
    id: 'g21', title: 'Counters (numbers)',
    pattern: 'Number + Counter + の + Noun', patternReading: 'Number + Counter + no + Noun',
    meaning: 'Counting specific items',
    usage: 'Japanese uses different counters for different types of objects. Common N5 counters: 〜人 (people), 〜つ (general things), 〜枚 (flat things).',
    examples: [
      { japanese: '三人の友達。', reading: 'さんにんのともだち。', english: 'Three friends.' },
      { japanese: 'リンゴを一つください。', reading: 'りんごをひとつください。', english: 'One apple please.' },
      { japanese: '切手を五枚買いました。', reading: 'きってをごまいかいました。', english: 'I bought five stamps.' },
    ],
  },
  {
    id: 'g22', title: 'Request ください',
    pattern: 'N を ください', patternReading: 'N wo kudasai',
    meaning: 'Please give me [noun]',
    usage: 'A simple way to ask for something. Just add ください after the item you want.',
    examples: [
      { japanese: '水をください。', reading: 'みずをください。', english: 'Water please.' },
      { japanese: 'メニューをください。', reading: 'めにゅーをください。', english: 'Menu please.' },
    ],
  },
  {
    id: 'g23', title: 'Want たい Form',
    pattern: 'Verb stem + たい', patternReading: 'Verb stem + tai',
    meaning: 'Want to [verb]',
    usage: 'Drop ます and add たい to express wanting to do something. Works like an い-adjective.',
    examples: [
      { japanese: '日本に行きたいです。', reading: 'にほんにいきたいです。', english: 'I want to go to Japan.' },
      { japanese: 'ご飯を食べたいです。', reading: 'ごはんをたべたいです。', english: 'I want to eat a meal.' },
    ],
  },
  {
    id: 'g24', title: 'ましょう (suggestion)',
    pattern: 'Verb stem + ましょう', patternReading: 'Verb stem + mashou',
    meaning: 'Let\'s [verb] / Shall we [verb]?',
    usage: 'Replace ます with ましょう to make suggestions or invitations.',
    examples: [
      { japanese: '一緒に行きましょう。', reading: 'いっしょにいきましょう。', english: 'Let\'s go together.' },
      { japanese: '食べましょう。', reading: 'たべましょう。', english: 'Let\'s eat.' },
    ],
  },
  {
    id: 'g25', title: 'Te-form for requests',
    pattern: 'Verb て form + ください', patternReading: 'Verb te-form + kudasai',
    meaning: 'Please do [verb]',
    usage: 'Make the te-form of a verb and add ください for polite requests.',
    examples: [
      { japanese: '読んでください。', reading: 'よんでください。', english: 'Please read.' },
      { japanese: '書いてください。', reading: 'かいてください。', english: 'Please write.' },
      { japanese: '待ってください。', reading: 'まってください。', english: 'Please wait.' },
    ],
  },
  {
    id: 'g26', title: 'Te-form for ongoing action',
    pattern: 'Verb て form + います', patternReading: 'Verb te-form + imasu',
    meaning: 'Is doing / Is in a state',
    usage: 'Te-form + います can mean an action in progress or a continuing state.',
    examples: [
      { japanese: '本を読んでいます。', reading: 'ほんをよんでいます。', english: 'I am reading a book.' },
      { japanese: '結婚しています。', reading: 'けっこんしています。', english: 'I am married.' },
    ],
  },
  {
    id: 'g27', title: 'ない Form (informal negative)',
    pattern: 'Verb ない form', patternReading: 'Verb nai form',
    meaning: 'Informal "do not"',
    usage: 'The informal negative form. For ru-verbs: replace る with ない. For u-verbs: change final u to a + ない.',
    examples: [
      { japanese: '行かない。', reading: 'いかない。', english: 'I won\'t go.' },
      { japanese: '食べない。', reading: 'たべない。', english: 'I won\'t eat.' },
    ],
  },
  {
    id: 'g28', title: 'Dictionary form (informal)',
    pattern: 'Verb dictionary form', patternReading: 'Verb dictionary form',
    meaning: 'Informal present/future',
    usage: 'The basic form of verbs found in the dictionary.',
    examples: [
      { japanese: '毎日勉強する。', reading: 'まいにちべんきょうする。', english: 'I study every day (casual).' },
      { japanese: '食べることが好きです。', reading: 'たべることがすきです。', english: 'I like eating.' },
    ],
  },
  {
    id: 'g29', title: '～たい and ～たくない',
    pattern: 'Adj stem + たい / たくない', patternReading: 'Adj stem + tai / takunai',
    meaning: 'Want / Don\'t want',
    usage: 'Add たい to verb stem for "want to". たくない is the negative.',
    examples: [
      { japanese: '映画が見たいです。', reading: 'えいががみたいです。', english: 'I want to watch a movie.' },
      { japanese: '勉強したくないです。', reading: 'べんきょうしたくないです。', english: 'I don\'t want to study.' },
    ],
  },
  {
    id: 'g30', title: '～とき (when)',
    pattern: 'Verb plain form + とき', patternReading: 'Verb plain form + toki',
    meaning: 'When [verb] / At the time of',
    usage: 'Used to express "when" something happens.',
    examples: [
      { japanese: '日本に行くとき、カメラを買います。', reading: 'にほんにいくとき、かめらをかいます。', english: 'When I go to Japan, I\'ll buy a camera.' },
      { japanese: '子供のとき、犬がいました。', reading: 'こどものとき、いぬがいました。', english: 'When I was a child, I had a dog.' },
    ],
  },
  {
    id: 'g31', title: 'Particle や (listing examples)',
    pattern: 'N1 や N2', patternReading: 'N1 ya N2',
    meaning: 'A and B (among other things)',
    usage: 'や lists examples, implying there are more items. Unlike と which lists everything, や is partial.',
    examples: [
      { japanese: '机の上に本やペンがあります。', reading: 'つくえのうえにほんやぺんがあります。', english: 'There are books, pens, etc. on the desk.' },
      { japanese: '日本や中国に行きました。', reading: 'にほんやちゅうごくにいきました。', english: 'I went to Japan, China, and other places.' },
    ],
  },
  {
    id: 'g32', title: 'Particle より (comparison)',
    pattern: 'A は B より Adj', patternReading: 'A wa B yori Adj',
    meaning: 'A is more Adj than B',
    usage: 'より marks the thing being compared against. AはBより大きい = "A is bigger than B." Use のほうが for "A is more."',
    examples: [
      { japanese: '日本語は英語より難しいです。', reading: 'にほんごはえいごよりむずかしいです。', english: 'Japanese is more difficult than English.' },
      { japanese: '猫より犬のほうが好きです。', reading: 'ねこよりいぬのほうがすきです。', english: 'I like dogs more than cats.' },
    ],
  },
  {
    id: 'g33', title: 'Particle だけ (only/just)',
    pattern: 'N だけ / V plain + だけ', patternReading: 'N dake / V plain + dake',
    meaning: 'Only / Just',
    usage: 'だけ follows a noun or verb to mean "only" or "just that and nothing else."',
    examples: [
      { japanese: 'これだけください。', reading: 'これだけください。', english: 'Just this please.' },
      { japanese: '一人だけ来ました。', reading: 'ひとりだけきました。', english: 'Only one person came.' },
    ],
  },
  {
    id: 'g34', title: '～てもいい (permission)',
    pattern: 'Verb て-form + もいい', patternReading: 'Verb te-form + mo ii',
    meaning: 'May do / Is it OK to do?',
    usage: 'Add もいい after the て-form to ask for or give permission. てもいいです = "may do." 質問してもいいですか = "May I ask a question?"',
    examples: [
      { japanese: 'ここに座ってもいいですか。', reading: 'ここにすわってもいいですか。', english: 'May I sit here?' },
      { japanese: '写真を撮ってもいいです。', reading: 'しゃしんをとってもいいです。', english: 'You may take photos.' },
    ],
  },
  {
    id: 'g35', title: '～てはいけない (prohibition)',
    pattern: 'Verb て-form + はいけない', patternReading: 'Verb te-form + wa ikenai',
    meaning: 'Must not do / Not allowed',
    usage: 'Add はいけない after the て-form to express prohibition. ではいけない → じゃいけない in casual speech. Often used with rules and warnings.',
    examples: [
      { japanese: 'ここでタバコを吸ってはいけません。', reading: 'ここでたばこをすってはいけません。', english: 'You must not smoke here.' },
      { japanese: '宿題を忘れてはいけません。', reading: 'しゅくだいをわすれてはいけません。', english: 'You must not forget your homework.' },
    ],
  },
];
