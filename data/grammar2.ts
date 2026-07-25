import { GrammarPoint } from '../types/grammar';

export const grammarData2: GrammarPoint[] = [
  {
    id: 'g36', title: 'Counters with Numbers',
    pattern: 'Number + Counter + の + Noun', patternReading: 'Number + Counter + no + Noun',
    meaning: 'Counting specific types of objects',
    usage: 'Japanese has different counters for different shapes: 枚 (flat), 本 (long), 匹 (animals), 冊 (books), 台 (machines), 人 (people). The counter follows the number and precedes the noun with の.',
    examples: [
      { japanese: 'りんごを三つ買いました。', reading: 'りんごをみっつかいました。', english: 'I bought three apples.' },
      { japanese: '猫が二匹います。', reading: 'ねこがにひきいます。', english: 'There are two cats.' },
    ],
  },
  {
    id: 'g37', title: 'Comparison: より・のほうが',
    pattern: 'A より B のほうが [adj]', patternReading: 'A yori B no hou ga [adj]',
    meaning: 'B is more [adj] than A',
    usage: 'Used to compare two items. A より marks the item being compared against, and B のほうが marks the item that is more [adjective].',
    examples: [
      { japanese: '東京より大阪のほうが安いです。', reading: 'とうきょうよりおおさかのほうがやすいです。', english: 'Osaka is cheaper than Tokyo.' },
      { japanese: '犬より猫のほうが好きです。', reading: 'いぬよりねこのほうがすきです。', english: 'I like cats more than dogs.' },
    ],
  },
  {
    id: 'g38', title: 'Expressing Want: 〜たい',
    pattern: 'Verb-stem + たい', patternReading: 'Verb-stem + tai',
    meaning: 'Want to do something',
    usage: 'Attach たい to the stem of a verb (remove ます from ます-form). Conjugates like an い-adjective. Example: 食べます → 食べたい (want to eat).',
    examples: [
      { japanese: '日本に行きたいです。', reading: 'にほんにいきたいです。', english: 'I want to go to Japan.' },
      { japanese: 'すしが食べたいです。', reading: 'すしがたべたいです。', english: 'I want to eat sushi.' },
    ],
  },
  {
    id: 'g39', title: 'Expressing Purpose: 〜に行く／来る',
    pattern: 'Verb-stem + に + 行く／来る／帰る', patternReading: 'Verb-stem + ni + iku/kuru/kaeru',
    meaning: 'Go / Come / Return in order to do something',
    usage: 'Combine the ます-stem of a verb with に and a motion verb (行く, 来る, 帰る). E.g. 買い物に行きます (go shopping).',
    examples: [
      { japanese: '映画を見に行きます。', reading: 'えいがをみにいきます。', english: 'I go to watch a movie.' },
      { japanese: '図書館に本を借りに来ました。', reading: 'としょかんにほんをかりにきました。', english: 'I came to the library to borrow a book.' },
    ],
  },
  {
    id: 'g40', title: 'Giving and Receiving: あげる・くれる・もらう',
    pattern: 'Person に Object を あげる/くれる/もらう', patternReading: 'Person ni Object wo ageru/kureru/morau',
    meaning: 'Give / Receive actions',
    usage: 'あげる = I give to someone (or someone gives to someone else). くれる = Someone gives to me. もらう = I receive from someone.',
    examples: [
      { japanese: '友達にプレゼントをあげました。', reading: 'ともだちにプレゼントをあげました。', english: 'I gave a present to my friend.' },
      { japanese: '母は本をくれました。', reading: 'はははほんをくれました。', english: 'My mother gave me a book.' },
      { japanese: '先生に辞書をもらいました。', reading: 'せんせいにじしょをもらいました。', english: 'I received a dictionary from the teacher.' },
    ],
  },
  {
    id: 'g41', title: 'Making Requests: 〜てください',
    pattern: 'Verb-て + ください', patternReading: 'Verb-te + kudasai',
    meaning: 'Please do ~',
    usage: 'Combine the て-form of a verb with ください for polite requests. 〜ないでください means "please don\'t do ~".',
    examples: [
      { japanese: '窓を開けてください。', reading: 'まどをあけてください。', english: 'Please open the window.' },
      { japanese: 'ここに名前を書いてください。', reading: 'ここになまえをかいてください。', english: 'Please write your name here.' },
    ],
  },
  {
    id: 'g42', title: 'Offering Help: 〜ましょうか',
    pattern: 'Verb-stem + ましょうか', patternReading: 'Verb-stem + mashou ka',
    meaning: 'Shall I do ~? / Let me do ~',
    usage: 'Used to offer help or suggest doing something. Attach ましょうか to the verb stem (remove ます).',
    examples: [
      { japanese: '窓を閉めましょうか。', reading: 'まどをしめましょうか。', english: 'Shall I close the window?' },
      { japanese: '荷物を持ちましょうか。', reading: 'にもつをもちましょうか。', english: 'Shall I carry your luggage?' },
    ],
  },
  {
    id: 'g43', title: 'Expressing "Easy/Hard to do": 〜やすい／〜にくい',
    pattern: 'Verb-stem + やすい／にくい', patternReading: 'Verb-stem + yasui/nikui',
    meaning: 'Easy to ~ / Hard to ~',
    usage: 'Attach やすい (easy to) or にくい (hard to) to the ます-stem of a verb. Conjugates like い-adjectives.',
    examples: [
      { japanese: 'この漢字は書きやすいです。', reading: 'このかんじはかきやすいです。', english: 'This kanji is easy to write.' },
      { japanese: 'この靴は歩きにくいです。', reading: 'このくつはあるきにくいです。', english: 'These shoes are hard to walk in.' },
    ],
  },
  {
    id: 'g44', title: 'Expressing "Too much": 〜すぎる',
    pattern: 'Verb-stem + すぎる / Adj stem + すぎる', patternReading: 'Verb-stem + sugiru / Adj stem + sugiru',
    meaning: 'Too much / Excessive',
    usage: 'Attach すぎる to the verb stem (remove ます) or to the adjective stem (remove い for い-adj, remove な for な-adj). Conjugates as a ru-verb.',
    examples: [
      { japanese: '食べすぎました。', reading: 'たべすぎました。', english: 'I ate too much.' },
      { japanese: 'この部屋は狭すぎます。', reading: 'このへやはせますぎます。', english: 'This room is too narrow.' },
    ],
  },
  {
    id: 'g45', title: 'Expressing "Before doing": 〜まえに',
    pattern: 'Verb-dictionary-form + 前に', patternReading: 'Verb-dictionary-form + mae ni',
    meaning: 'Before doing ~',
    usage: 'Used to express an action that happens before another. The verb before 前 is in dictionary form. For nouns, add の before 前.',
    examples: [
      { japanese: '食べる前に手を洗います。', reading: 'たべるまえにてをあらいます。', english: 'I wash my hands before eating.' },
      { japanese: '授業の前にコーヒーを飲みます。', reading: 'じゅぎょうのまえにコーヒーをのみます。', english: 'I drink coffee before class.' },
    ],
  },
  {
    id: 'g46', title: 'Expressing "After doing": 〜たあとで',
    pattern: 'Verb-た + あとで', patternReading: 'Verb-ta + ato de',
    meaning: 'After doing ~',
    usage: 'Used to express an action that happens after another. The verb before あと is in た-form (past tense). For nouns, use のあとで.',
    examples: [
      { japanese: '仕事が終わったあとで、映画を見ます。', reading: 'しごとがおわったあとで、えいがをみます。', english: 'After work finishes, I will watch a movie.' },
      { japanese: 'ご飯を食べたあとで、散歩します。', reading: 'ごはんをたべたあとで、さんぽします。', english: 'After eating, I take a walk.' },
    ],
  },
  {
    id: 'g47', title: 'Expressing "While doing": 〜ながら',
    pattern: 'Verb-stem + ながら', patternReading: 'Verb-stem + nagara',
    meaning: 'While doing ~ (same subject)',
    usage: 'Attach ながら to the ます-stem of a verb to express two actions done simultaneously by the same subject. The main action comes at the end.',
    examples: [
      { japanese: '音楽を聞きながら勉強します。', reading: 'おんがくをききながらべんきょうします。', english: 'I study while listening to music.' },
      { japanese: 'テレビを見ながらご飯を食べます。', reading: 'テレビをみながらごはんをたべます。', english: 'I eat while watching TV.' },
    ],
  },
  {
    id: 'g48', title: 'Connecting Adjectives: 〜くて／〜で',
    pattern: 'い-adj → 〜くて、 な-adj → 〜で', patternReading: 'i-adj → ~kute, na-adj → ~de',
    meaning: 'Connecting multiple adjectives (and / but)',
    usage: 'To connect two adjectives, change the first adjective: い-adj: replace い with くて (e.g. 大きくて安い). な-adj: add で (e.g. 静かで綺麗).',
    examples: [
      { japanese: 'この店は安くて美味しいです。', reading: 'このみせはやすくておいしいです。', english: 'This shop is cheap and delicious.' },
      { japanese: 'この部屋は静かで広いです。', reading: 'このへやはしずかでひろいです。', english: 'This room is quiet and spacious.' },
    ],
  },
  {
    id: 'g49', title: 'Connecting Verbs: 〜て (Sequence/Reason)',
    pattern: 'Verb-て + Verb', patternReading: 'Verb-te + Verb',
    meaning: 'Connecting actions (sequence or reason)',
    usage: 'The て-form connects verbs to show sequence (I do A and then B) or reason (I do A and then B as a result). The tense is determined by the final verb.',
    examples: [
      { japanese: '駅に行って、電車に乗ります。', reading: 'えきにいって、でんしゃにのります。', english: 'I go to the station and board the train.' },
      { japanese: '毎朝起きて、歯を磨きます。', reading: 'まいあさおきて、はをみがきます。', english: 'Every morning I wake up and brush my teeth.' },
    ],
  },
  {
    id: 'g50', title: 'Expressing "Must do": 〜なければなりません',
    pattern: 'Verb-ない + ければなりません', patternReading: 'Verb-nai + kereba narimasen',
    meaning: 'Must do ~',
    usage: 'Take the ない-form of a verb, remove い, add ければなりません. The ない-form for する becomes しなければ, for 来る becomes 来なければ.',
    examples: [
      { japanese: '宿題をしなければなりません。', reading: 'しゅくだいをしなければなりません。', english: 'I must do my homework.' },
      { japanese: '薬を飲まなければなりません。', reading: 'くすりをのまなければなりません。', english: 'I must take medicine.' },
    ],
  },
  {
    id: 'g51', title: 'Expressing "Don\'t have to": 〜なくてもいい',
    pattern: 'Verb-ない + くてもいい', patternReading: 'Verb-nai + kutemo ii',
    meaning: 'Does not have to / It is okay not to',
    usage: 'Take the ない-form of a verb, remove い, add くてもいい. Expresses that an action is not required.',
    examples: [
      { japanese: '明日は来なくてもいいです。', reading: 'あしたはこなくてもいいです。', english: 'You don\'t have to come tomorrow.' },
      { japanese: '全部食べなくてもいいです。', reading: 'ぜんぶたべなくてもいいです。', english: 'You don\'t have to eat everything.' },
    ],
  },
  {
    id: 'g52', title: 'Expressing Permission: 〜てもいい',
    pattern: 'Verb-て + もいい', patternReading: 'Verb-te + mo ii',
    meaning: 'May do / Allowed to do',
    usage: 'Use the て-form of a verb followed by もいいです to ask for or give permission. 〜てもいいですか is used to ask "May I do ~?"',
    examples: [
      { japanese: 'ここに座ってもいいですか。', reading: 'ここにすわってもいいですか。', english: 'May I sit here?' },
      { japanese: '写真を撮ってもいいです。', reading: 'しゃしんをとってもいいです。', english: 'You may take photos.' },
    ],
  },
  {
    id: 'g53', title: 'Expressing Experience: 〜たことがある',
    pattern: 'Verb-た + ことがある', patternReading: 'Verb-ta + koto ga aru',
    meaning: 'Have done ~ before (experience)',
    usage: 'Use the た-form of a verb followed by ことがある to express past experience. Use ことがない for negative.',
    examples: [
      { japanese: '日本に行ったことがあります。', reading: 'にほんにいったことがあります。', english: 'I have been to Japan before.' },
      { japanese: 'すしを食べたことがありません。', reading: 'すしをたべたことがありません。', english: 'I have never eaten sushi.' },
    ],
  },
  {
    id: 'g54', title: 'Expressing State Change: 〜くなる／〜になる',
    pattern: 'い-adj → く + なる、 な-adj → に + なる', patternReading: 'i-adj → ku + naru, na-adj → ni + naru',
    meaning: 'Become ~',
    usage: 'Used to express a change in state. For い-adjectives: replace い with くなる. For な-adjectives: add になる. For nouns: add になる.',
    examples: [
      { japanese: '寒くなりました。', reading: 'さむくなりました。', english: 'It became cold.' },
      { japanese: '医者になりたいです。', reading: 'いしゃになりたいです。', english: 'I want to become a doctor.' },
    ],
  },
  {
    id: 'g55', title: 'Giving Advice: 〜たほうがいい',
    pattern: 'Verb-た + ほうがいい', patternReading: 'Verb-ta + hou ga ii',
    meaning: 'Had better do / It is advisable to',
    usage: 'Use the た-form of a verb followed by ほうがいい to give advice or suggest a better option. For negative advice, use 〜ないほうがいい.',
    examples: [
      { japanese: '早く寝たほうがいいです。', reading: 'はやくねたほうがいいです。', english: 'You had better sleep early.' },
      { japanese: 'タバコを吸わないほうがいいです。', reading: 'タバコをすわないほうがいいです。', english: 'You had better not smoke.' },
    ],
  },
  {
    id: 'g56', title: 'Expressing "Should do / Must do" (weak obligation): 〜たほうがいい vs 〜なければならない',
    pattern: 'Verb-たほうがいい／Verb-なければならない', patternReading: 'Verb-ta hou ga ii / Verb-nakereba naranai',
    meaning: 'Should do (advice) vs Must do (obligation)',
    usage: '〜たほうがいい is advice ("you should / it\'d be better to"). 〜なければならない is strong obligation ("you must / have to") with no choice.',
    examples: [
      { japanese: '医者に行ったほうがいいですよ。', reading: 'いしゃにいったほうがいいですよ。', english: 'You should go to the doctor.' },
      { japanese: '毎日薬を飲まなければなりません。', reading: 'まいにちくだりをのまなければなりません。', english: 'I must take medicine every day.' },
    ],
  },
  {
    id: 'g57', title: 'Expressing "Let\'s do": 〜ましょう (volitional)',
    pattern: 'Verb-stem + ましょう', patternReading: 'Verb-stem + mashou',
    meaning: 'Let\'s do ~',
    usage: 'Attach ましょう to the ます-stem (remove ます). Used to suggest doing something together. Casual form: verb-dictionary-form + よう.',
    examples: [
      { japanese: '一緒に帰りましょう。', reading: 'いっしょにかえりましょう。', english: 'Let\'s go home together.' },
      { japanese: 'もう一度しましょう。', reading: 'もういちどしましょう。', english: 'Let\'s do it one more time.' },
    ],
  },
];
