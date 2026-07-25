export interface RadicalEntry {
  radical: string;
  meaning: string;
  strokeCount: number;
  examples: string[];
  mnemonic?: string;
}

export const radicalData: RadicalEntry[] = [
  { radical: '人', meaning: 'Person', strokeCount: 2, examples: ['体', '住', '他'], mnemonic: 'A person standing with legs apart' },
  { radical: '日', meaning: 'Sun / Day', strokeCount: 4, examples: ['明', '時', '曜'], mnemonic: 'The sun in a square window' },
  { radical: '月', meaning: 'Moon / Month', strokeCount: 4, examples: ['明', '朝', '有'], mnemonic: 'A crescent moon with cloud lines' },
  { radical: '木', meaning: 'Tree', strokeCount: 4, examples: ['林', '森', '机'], mnemonic: 'A tree with branches and roots' },
  { radical: '水', meaning: 'Water', strokeCount: 4, examples: ['泳', '海', '酒'], mnemonic: 'Flowing water with splashes on the sides' },
  { radical: '火', meaning: 'Fire', strokeCount: 4, examples: ['焼', '煙', '灯'], mnemonic: 'A person with arms up as flames' },
  { radical: '土', meaning: 'Earth', strokeCount: 3, examples: ['地', '場', '城'], mnemonic: 'A mound of earth with plants' },
  { radical: '金', meaning: 'Gold / Money', strokeCount: 8, examples: ['銀', '鉄', '針'], mnemonic: 'Gold nuggets under a roof' },
  { radical: '口', meaning: 'Mouth', strokeCount: 3, examples: ['話', '飲', '吸'], mnemonic: 'An open mouth' },
  { radical: '田', meaning: 'Field', strokeCount: 5, examples: ['男', '町', '思'], mnemonic: 'A rice field divided into paddies' },
  { radical: '目', meaning: 'Eye', strokeCount: 5, examples: ['見', '眠', '眼'], mnemonic: 'An eye with a pupil' },
  { radical: '心', meaning: 'Heart', strokeCount: 4, examples: ['思', '想', '意'], mnemonic: 'A heart with chambers' },
  { radical: '手', meaning: 'Hand', strokeCount: 4, examples: ['持', '指', '操'], mnemonic: 'A hand with fingers extended' },
  { radical: '足', meaning: 'Foot', strokeCount: 7, examples: ['路', '跳', '眼'], mnemonic: 'A foot with toes and a heel' },
  { radical: '山', meaning: 'Mountain', strokeCount: 3, examples: ['岳', '峰', '歳'], mnemonic: 'Three mountain peaks' },
  { radical: '川', meaning: 'River', strokeCount: 3, examples: ['州', '順', '巡'], mnemonic: 'Flowing water between banks' },
  { radical: '雨', meaning: 'Rain', strokeCount: 8, examples: ['電', '雲', '雪'], mnemonic: 'Rain falling from a cloud' },
  { radical: '力', meaning: 'Power', strokeCount: 2, examples: ['男', '勉', '勝'], mnemonic: 'A strong arm with flexed muscle' },
  { radical: '王', meaning: 'King / Jewel', strokeCount: 4, examples: ['玉', '宝', '国'], mnemonic: 'A king wearing a crown' },
  { radical: '女', meaning: 'Woman', strokeCount: 3, examples: ['好', '妹', '妻'], mnemonic: 'A woman with folded arms' },
  { radical: '子', meaning: 'Child', strokeCount: 3, examples: ['学', '好', '孫'], mnemonic: 'A child wrapped in blankets' },
  { radical: '虫', meaning: 'Insect', strokeCount: 6, examples: ['蚊', '蛇', '蚕'], mnemonic: 'A crawling insect with segments' },
  { radical: '車', meaning: 'Car / Vehicle', strokeCount: 7, examples: ['輪', '軍', '転'], mnemonic: 'A cart with wheels seen from above' },
  { radical: '門', meaning: 'Gate', strokeCount: 8, examples: ['問', '聞', '間'], mnemonic: 'A pair of swinging gates' },
  { radical: '貝', meaning: 'Shell / Money', strokeCount: 7, examples: ['買', '貸', '財'], mnemonic: 'A clam shell, once used as currency' },
  { radical: '糸', meaning: 'Thread', strokeCount: 6, examples: ['紙', '線', '紅'], mnemonic: 'Twisted silk threads' },
  { radical: '石', meaning: 'Stone', strokeCount: 5, examples: ['岩', '砂', '炭'], mnemonic: 'A cliff with a stone below' },
  { radical: '竹', meaning: 'Bamboo', strokeCount: 6, examples: ['答', '筆', '筒'], mnemonic: 'Bamboo stalks with leaves' },
  { radical: '肉', meaning: 'Meat', strokeCount: 6, examples: ['胃', '育', '腸'], mnemonic: 'A ribcage with meat attached' },
  { radical: '音', meaning: 'Sound', strokeCount: 9, examples: ['暗', '韻', '響'], mnemonic: 'Sound waves rising from a mouth' },
];
