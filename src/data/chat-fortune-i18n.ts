/**
 * 별의 도사 챗봇 다국어 템플릿
 * 5개 언어 × 감정 상태 × 시간대 분기
 * seededRandom 패턴 준수 (외부에서 seed 전달)
 */

export type SupportedLocale = 'ko' | 'en' | 'zh' | 'ja' | 'es';

export interface ChatI18nTemplates {
  timeGreeting: Record<'morning' | 'afternoon' | 'evening', string>;
  greetings: string[];
  emotionQuestion: Record<number, string>; // 0=Sun ... 6=Sat (day of week)
  emotionChoices: Record<'positive' | 'neutral' | 'negative', string>;
  emotionResponses: Record<'positive' | 'neutral' | 'negative', string[]>;
  scoreDesc: Record<'high' | 'mid' | 'low', string>;
  fortuneIntros: string[];
  bonusMessages: string[];
  tarotOffer: string;
  tarotChoices: Record<'yes' | 'no', string>;
  closings: Record<'tarot' | 'no-tarot', string[]>;
  restartLabel: string;
  chatTitle: string;
  chatSubtitle: string;
  openLabel: string;
  closeLabel: string;
}

/** 별자리 이름 다국어 */
export const SIGN_NAMES: Record<string, Record<SupportedLocale, string>> = {
  aries:       { ko: '양자리', en: 'Aries', zh: '白羊座', ja: '牡羊座', es: 'Aries' },
  taurus:      { ko: '황소자리', en: 'Taurus', zh: '金牛座', ja: '牡牛座', es: 'Tauro' },
  gemini:      { ko: '쌍둥이자리', en: 'Gemini', zh: '双子座', ja: '双子座', es: 'Géminis' },
  cancer:      { ko: '게자리', en: 'Cancer', zh: '巨蟹座', ja: '蟹座', es: 'Cáncer' },
  leo:         { ko: '사자자리', en: 'Leo', zh: '狮子座', ja: '獅子座', es: 'Leo' },
  virgo:       { ko: '처녀자리', en: 'Virgo', zh: '处女座', ja: '乙女座', es: 'Virgo' },
  libra:       { ko: '천칭자리', en: 'Libra', zh: '天秤座', ja: '天秤座', es: 'Libra' },
  scorpio:     { ko: '전갈자리', en: 'Scorpio', zh: '天蝎座', ja: '蠍座', es: 'Escorpio' },
  sagittarius: { ko: '사수자리', en: 'Sagittarius', zh: '射手座', ja: '射手座', es: 'Sagitario' },
  capricorn:   { ko: '염소자리', en: 'Capricorn', zh: '摩羯座', ja: '山羊座', es: 'Capricornio' },
  aquarius:    { ko: '물병자리', en: 'Aquarius', zh: '水瓶座', ja: '水瓶座', es: 'Acuario' },
  pisces:      { ko: '물고기자리', en: 'Pisces', zh: '双鱼座', ja: '魚座', es: 'Piscis' },
};

export const CHAT_I18N: Record<SupportedLocale, ChatI18nTemplates> = {
  ko: {
    timeGreeting: { morning: '좋은 아침이에요', afternoon: '반가워요', evening: '고요한 밤이네요' },
    greetings: [
      '{time}, {sign}님. 별의 도사입니다. 오늘 별들이 당신에게 전하고 싶은 이야기가 있어요.',
      '어서 오세요, {sign}님. 오늘 밤하늘에 당신의 별이 유독 빛나고 있어요.',
      '{time}, {sign}님. 오늘 우주의 기운이 당신 주위를 감싸고 있는 것이 느껴져요.',
      '{sign}님, 기다리고 있었어요. 별의 도사가 오늘 특별한 이야기를 준비했답니다.',
      '{time}! {sign}님의 별자리에서 흥미로운 신호가 감지됐어요. 함께 확인해볼까요?',
      '{sign}님, 오늘 당신의 별이 가장 밝은 자리에 있어요. 좋은 시간이 될 것 같아요.',
      '별의 도사, 다시 만나 반갑습니다 {sign}님. 어제와는 다른 메시지가 준비되어 있어요.',
    ],
    emotionQuestion: {
      0: '{sign}님, 주말의 여유를 즐기고 계신가요? 오늘의 에너지가 궁금해요.',
      1: '{sign}님, 새로운 한 주가 시작됐어요! 오늘 직장(학교)에서의 기분이 어떤가요?',
      2: '{sign}님, 화요일엔 특히 인간관계의 기운이 강해요. 주변 사람들과의 관계는 어떤가요?',
      3: '{sign}님, 한 주의 중간에 왔어요. 이번 주 여기까지 어떠셨나요?',
      4: '{sign}님, 목요일엔 자기 성찰의 에너지가 흘러요. 최근 내면의 상태는 어떤가요?',
      5: '{sign}님, 불금이에요! 오늘 밤의 에너지가 특별한데, 기분은 어떠신가요?',
      6: '{sign}님, 토요일에 별의 도사를 찾아주셨네요. 오늘 하루를 어떤 마음으로 시작하셨나요?',
    },
    emotionChoices: { positive: '기분이 좋아요! ✨', neutral: '그냥 보통이에요', negative: '좀 힘들어요...' },
    emotionResponses: {
      positive: [
        '{sign}님의 밝은 기운이 저에게까지 전해지네요! 오늘 별들도 당신의 기쁨에 함께하고 있어요.',
        '역시 {sign}님답게 빛나고 계시군요! 이 좋은 에너지가 오늘 하루를 더욱 특별하게 만들어줄 거예요.',
        '그 활력이 느껴져요! 오늘 별의 흐름도 당신의 기분과 잘 맞아요.',
        '와, 별자리 도사인 저까지 기분이 좋아지네요! 이 에너지를 오늘 하루 꽉 잡으세요.',
        '{sign}님의 긍정적인 파동이 별들에게도 전해져요. 오늘은 좋은 일이 연쇄적으로 일어날 기운이에요.',
        '오늘 금성이 {sign}님 편이에요. 좋은 기분에 행운까지 더해질 날이에요!',
      ],
      neutral: [
        '차분한 에너지군요. 사실 이런 날이 운세를 가장 잘 읽을 수 있는 날이에요.',
        '평온한 마음... 좋아요. 맑은 호수처럼 고요할 때 별빛이 가장 선명하게 비치거든요.',
        '그런 날도 있죠. 하지만 오늘의 별은 {sign}님에게 작은 설렘을 준비했어요.',
        '보통인 날이야말로 별의 메시지가 가장 중요한 날이에요. 평온함 속에 기회가 숨어있거든요.',
        '{sign}님, 균형 잡힌 마음이 좋은 출발점이에요. 여기서 어느 방향으로든 나아갈 수 있어요.',
        '때론 잔잔한 바다가 가장 깊죠. 오늘의 메시지가 수면 아래의 보석을 보여줄 거예요.',
      ],
      negative: [
        '마음이 무거우시군요... 별이 당신의 마음을 읽었나 봐요. 하지만 걱정 마세요, 오후부터는 목성의 보호를 받게 됩니다.',
        '그런 날이 있죠. 하지만 알고 계셨나요? 가장 어두운 밤에 가장 밝은 별이 보인다는 것을.',
        '{sign}님, 힘든 감정도 지나갈 거예요. 오늘 별이 특별한 위로의 메시지를 준비했어요.',
        '{sign}님, 괜찮아요. 달도 차면 기울듯이, 어려운 시간도 반드시 지나갑니다.',
        '힘든 감정을 솔직하게 나눠주셔서 감사해요. 별들이 {sign}님에게 따뜻한 빛을 보내고 있어요.',
        '{sign}님, 지금 느끼는 감정은 내면이 변화를 준비하는 신호일 수 있어요.',
      ],
    },
    scoreDesc: { high: '아주 좋은 기운', mid: '안정적인 기운', low: '조심스러운 기운' },
    fortuneIntros: [
      '오늘 {sign}의 별자리에 {scoreDesc}이 흐르고 있어요. 자세히 살펴볼까요?',
      '별들의 배치를 보니... {scoreDesc}이 감지돼요. 하나씩 풀어드릴게요.',
      '오늘의 천체 흐름을 읽어보니, {scoreDesc}이 당신을 감싸고 있네요.',
      '흥미롭군요... 수성과 금성의 각도가 {scoreDesc}을 만들어내고 있어요.',
      '별의 도사의 수정구슬에 {scoreDesc}이 비치고 있어요. 함께 읽어볼까요?',
      '오늘의 별자리 배열이 독특해요. {scoreDesc}이 특별한 메시지를 품고 있네요.',
    ],
    bonusMessages: [
      '잠깐, 특별한 신호가 잡혔어요! 오늘 당신에게만 전하는 비밀... 오후 3시에 하늘을 올려다보세요.',
      '오! {sign}님, 방금 유성이 당신의 별자리를 지나갔어요. 이건 드문 행운의 신호랍니다!',
      '별의 도사만 아는 비밀인데... 오늘 당신의 운세에 숨겨진 보너스가 있어요!',
    ],
    tarotOffer: '오늘 당신에게 특별히 전해드리고 싶은 카드가 있어요. 뽑아보시겠어요?',
    tarotChoices: { yes: '네, 뽑아볼게요! 🃏', no: '오늘은 괜찮아요' },
    closings: {
      tarot: [
        '{sign}님, 카드의 메시지도 함께 확인해보세요. 오늘도 별과 함께 빛나는 하루 되세요! ✨',
        '좋은 선택이에요! 타로의 메시지가 오늘의 길잡이가 될 거예요. 내일 또 뵐게요, {sign}님.',
        '카드가 전하는 메시지를 마음에 새겨두세요. {sign}님의 하루가 빛날 거예요!',
      ],
      'no-tarot': [
        '{sign}님, 오늘도 좋은 하루 보내세요. 별이 항상 당신 곁에 있을게요. ✨',
        '내일은 또 다른 별의 메시지가 기다리고 있을 거예요. 내일 또 뵐게요, {sign}님!',
        '오늘 나눈 이야기가 하루의 나침반이 되길 바라요. 별의 도사는 언제나 여기 있을게요.',
      ],
    },
    restartLabel: '다시 대화하기',
    chatTitle: '별의 도사',
    chatSubtitle: '감정에 맞춰 오늘의 메시지를 전해드려요',
    openLabel: '🔮 대화 시작하기',
    closeLabel: '오늘 기분에 맞춘 한 줄 조언이 필요할 때',
  },

  en: {
    timeGreeting: { morning: 'Good morning', afternoon: 'Welcome', evening: 'Good evening' },
    greetings: [
      '{time}, {sign}. I am the Star Seer. The stars have a message for you today.',
      'Welcome, {sign}. Your star is shining especially bright in the night sky today.',
      '{time}, {sign}. I can feel the cosmic energy wrapping around you today.',
      '{sign}, I have been waiting. The Star Seer has prepared something special for you today.',
      '{time}! An intriguing signal has been detected from your constellation, {sign}. Shall we explore it?',
      '{sign}, your star is in its brightest position today. This will be a wonderful time.',
      'Welcome back, {sign}. A different message from yesterday awaits you.',
    ],
    emotionQuestion: {
      0: '{sign}, are you enjoying the weekend? I\'m curious about your energy today.',
      1: '{sign}, a new week has begun! How are you feeling at work or school today?',
      2: '{sign}, Tuesday brings strong interpersonal energy. How are your relationships with those around you?',
      3: '{sign}, we\'re in the middle of the week. How has it been going so far?',
      4: '{sign}, Thursday carries self-reflection energy. How is your inner state recently?',
      5: '{sign}, it\'s Friday! Tonight\'s energy is special — how are you feeling?',
      6: '{sign}, you\'ve come to the Star Seer on Saturday. What mindset did you start today with?',
    },
    emotionChoices: { positive: 'Feeling great! ✨', neutral: 'Just average', negative: 'A bit rough...' },
    emotionResponses: {
      positive: [
        '{sign}, your bright energy reaches me too! The stars are sharing in your joy today.',
        'Just like {sign} — shining brilliantly! This wonderful energy will make today even more special.',
        'I can feel that vitality! The flow of stars today aligns well with your mood.',
        'Even I, the Star Seer, feel uplifted! Hold onto this energy throughout your day.',
        '{sign}, your positive vibration reaches the stars too. Today is primed for a chain of good things.',
        'Venus is on your side today, {sign}. Good mood and good fortune combine!',
      ],
      neutral: [
        'A calm energy. Actually, this kind of day is when you can read fortunes most clearly.',
        'A peaceful mind... perfect. Just like a clear lake — when still, starlight reflects most vividly.',
        'Such days happen. But today\'s stars have prepared a small thrill for you, {sign}.',
        'An ordinary day is when the star\'s message matters most. Opportunities hide within calm.',
        '{sign}, a balanced mind is a great starting point. You can move in any direction from here.',
        'Sometimes the calmest sea is the deepest. Today\'s message will reveal hidden gems.',
      ],
      negative: [
        'Your heart feels heavy... the stars seem to have felt it. But don\'t worry — Jupiter\'s protection begins this afternoon.',
        'Such days happen. But did you know? The brightest stars are seen on the darkest nights.',
        '{sign}, difficult emotions will pass. Today\'s stars have prepared a special message of comfort.',
        '{sign}, it\'s okay. Just as the moon waxes and wanes, difficult times always pass.',
        'Thank you for sharing your true feelings. The stars are sending warm light to you, {sign}.',
        '{sign}, the feelings you\'re experiencing may be a signal that something is shifting inside you.',
      ],
    },
    scoreDesc: { high: 'very positive energy', mid: 'stable energy', low: 'cautious energy' },
    fortuneIntros: [
      '{scoreDesc} is flowing through {sign}\'s constellation today. Shall we look closely?',
      'Looking at the star alignments... {scoreDesc} is detected. Let me reveal it one by one.',
      'Reading today\'s celestial flow, {scoreDesc} is surrounding you.',
      'Interesting... the angle of Mercury and Venus is creating {scoreDesc}.',
      '{scoreDesc} is reflected in the Star Seer\'s crystal ball. Shall we read it together?',
      'Today\'s constellation arrangement is unique. {scoreDesc} holds a special message.',
    ],
    bonusMessages: [
      'Wait — a special signal! A secret just for you today... Look up at the sky at 3 PM.',
      'Oh! {sign}, a shooting star just crossed your constellation. This is a rare sign of luck!',
      'A secret only the Star Seer knows... there is a hidden bonus in your fortune today!',
    ],
    tarotOffer: 'There is a card I especially want to share with you today. Would you like to draw one?',
    tarotChoices: { yes: 'Yes, let\'s draw! 🃏', no: 'Maybe not today' },
    closings: {
      tarot: [
        '{sign}, check the card\'s message too. May today shine with the stars! ✨',
        'A great choice! The tarot message will be your guide today. See you tomorrow, {sign}.',
        'Keep the card\'s message in your heart. Your day will shine, {sign}!',
      ],
      'no-tarot': [
        '{sign}, have a wonderful day. The stars will always be by your side. ✨',
        'Another star message awaits tomorrow. See you then, {sign}!',
        'May today\'s conversation be your compass. The Star Seer is always here.',
      ],
    },
    restartLabel: 'Chat Again',
    chatTitle: 'Star Seer',
    chatSubtitle: 'A personalized message based on your feelings today',
    openLabel: '🔮 Start Chat',
    closeLabel: 'Need a one-line insight tailored to your mood today?',
  },

  zh: {
    timeGreeting: { morning: '早上好', afternoon: '欢迎', evening: '晚上好' },
    greetings: [
      '{time}，{sign}。我是星座占卜师。今天星星有话想对您说。',
      '欢迎，{sign}。今晚天空中您的星星格外耀眼。',
      '{time}，{sign}。我能感受到宇宙的能量今天环绕着您。',
      '{sign}，我一直在等您。星座占卜师今天准备了特别的故事。',
      '{time}！{sign}的星座发出了有趣的信号。我们来一起探索吧？',
      '{sign}，您的星星今天处于最明亮的位置。将会是美好的时光。',
      '欢迎回来，{sign}。今天有与昨天不同的信息等着您。',
    ],
    emotionQuestion: {
      0: '{sign}，您在享受周末的悠闲吗？很好奇您今天的能量状态。',
      1: '{sign}，新的一周开始了！今天在工作（学校）的心情怎么样？',
      2: '{sign}，周二特别有人际关系的能量。和周围人的关系怎么样？',
      3: '{sign}，已经到了一周的中间。这周到目前为止感觉怎么样？',
      4: '{sign}，周四有自我反思的能量。最近内心状态如何？',
      5: '{sign}，今天是周五！今晚的能量特别，心情怎么样？',
      6: '{sign}，您在周六来找星座占卜师了。今天以什么心情开始的呢？',
    },
    emotionChoices: { positive: '心情很好！✨', neutral: '还行，普通', negative: '有点难受...' },
    emotionResponses: {
      positive: [
        '{sign}，您明亮的能量传递给我了！今天星星也在和您一起分享喜悦。',
        '果然是{sign}风格，光芒四射！这份美好的能量会让今天更加特别。',
        '我感受到了那份活力！今天的星星流向和您的心情很契合。',
        '连我这个星座占卜师都开心了！好好把握今天这份能量吧。',
        '{sign}，您积极的波动也传递给星星了。今天好事连连的气运很强。',
        '今天金星站在{sign}这边。好心情加上好运，双喜临门！',
      ],
      neutral: [
        '平静的能量。其实这样的日子是最能读懂运势的日子。',
        '平和的心境...很好。就像清澈的湖，平静时星光倒影最清晰。',
        '这样的日子也会有的。但今天的星星为{sign}准备了小小的惊喜。',
        '普通的日子恰恰是星星信息最重要的日子。平静中藏着机会。',
        '{sign}，平衡的心态是好的出发点。从这里可以向任何方向前进。',
        '有时最平静的海洋最深邃。今天的信息会揭示水面下的宝藏。',
      ],
      negative: [
        '心情沉重吗...星星似乎感受到了。但请放心，下午开始木星将保护您。',
        '这样的日子会有的。但您知道吗？最黑暗的夜晚能看到最明亮的星星。',
        '{sign}，困难的情绪也会过去的。今天的星星准备了特别的安慰信息。',
        '{sign}，没关系。就像月有盈亏，困难的时光也一定会过去。',
        '感谢您真诚地分享感受。星星正在向{sign}发送温暖的光。',
        '{sign}，您现在的感受可能是内心在准备变化的信号。',
      ],
    },
    scoreDesc: { high: '非常好的能量', mid: '稳定的能量', low: '谨慎的能量' },
    fortuneIntros: [
      '今天{sign}的星座中流动着{scoreDesc}。让我们仔细看看吧？',
      '看星象排列...感知到了{scoreDesc}。让我一一为您解析。',
      '读取今日天象，{scoreDesc}正环绕着您。',
      '有趣...水星和金星的角度形成了{scoreDesc}。',
      '占卜师的水晶球中映出了{scoreDesc}。一起来读取吧？',
      '今日星座排列独特。{scoreDesc}蕴含着特别的信息。',
    ],
    bonusMessages: [
      '等一下，捕捉到了特别信号！今天只告诉您的秘密...下午3点抬头看看天空。',
      '哦！{sign}，刚才有一颗流星划过您的星座。这是罕见的好运信号！',
      '只有星座占卜师知道的秘密...您今天的运势中有隐藏的惊喜！',
    ],
    tarotOffer: '今天有张特别想传达给您的牌。要来抽一张吗？',
    tarotChoices: { yes: '好的，来抽！🃏', no: '今天就算了' },
    closings: {
      tarot: [
        '{sign}，也请一起查看牌的信息。愿今天也与星星同行，光芒四射！✨',
        '好的选择！塔罗的信息将成为今天的引路人。明天再见，{sign}。',
        '请把牌传达的信息铭记于心。{sign}的一天将会闪耀！',
      ],
      'no-tarot': [
        '{sign}，今天也祝您有美好的一天。星星永远在您身边。✨',
        '明天又有新的星星信息在等待。明天见，{sign}！',
        '希望今天聊的内容成为您一天的指南针。星座占卜师随时在这里。',
      ],
    },
    restartLabel: '再次对话',
    chatTitle: '星座占卜师',
    chatSubtitle: '根据您今天的心情传达最适合的信息',
    openLabel: '🔮 开始对话',
    closeLabel: '需要根据今日心情定制的一句话建议时',
  },

  ja: {
    timeGreeting: { morning: 'おはようございます', afternoon: 'こんにちは', evening: 'こんばんは' },
    greetings: [
      '{time}、{sign}様。星の占い師です。今日、星があなたに伝えたいことがあります。',
      'いらっしゃいませ、{sign}様。今夜の夜空であなたの星が特別に輝いています。',
      '{time}、{sign}様。今日は宇宙のエネルギーがあなたを包んでいるのを感じます。',
      '{sign}様、お待ちしていました。星の占い師が今日特別なお話を準備しました。',
      '{time}！{sign}様の星座から興味深い信号を感知しました。一緒に確認しましょうか？',
      '{sign}様、今日はあなたの星が最も明るい位置にあります。素晴らしい時間になりそうです。',
      'おかえりなさい、{sign}様。昨日とは違うメッセージが準備されています。',
    ],
    emotionQuestion: {
      0: '{sign}様、週末のゆとりを楽しんでいますか？今日のエネルギーが気になります。',
      1: '{sign}様、新しい一週間が始まりました！今日、職場（学校）での気分はいかがですか？',
      2: '{sign}様、火曜日は特に人間関係のエネルギーが強いです。周囲の方との関係はいかがですか？',
      3: '{sign}様、週の真ん中に来ました。今週ここまでいかがでしたか？',
      4: '{sign}様、木曜日は自己内省のエネルギーが流れます。最近の内なる状態はいかがですか？',
      5: '{sign}様、花金ですね！今夜のエネルギーが特別なのですが、気分はいかがですか？',
      6: '{sign}様、土曜日に星の占い師を訪ねてくださいましたね。今日はどんな気持ちで始めましたか？',
    },
    emotionChoices: { positive: '気分がいいです！✨', neutral: 'まあまあです', negative: 'ちょっと辛いです...' },
    emotionResponses: {
      positive: [
        '{sign}様の明るいエネルギーが私にも伝わってきます！今日の星々もあなたの喜びと共にあります。',
        'さすが{sign}様らしく輝いていますね！この素晴らしいエネルギーが今日をより特別にしてくれます。',
        'その活力が感じられます！今日の星の流れもあなたの気分とよく合っています。',
        '占い師の私まで嬉しくなりますね！このエネルギーを今日一日しっかり掴んでください。',
        '{sign}様のポジティブな波動が星々にも伝わっています。今日は良いことが連鎖する気運です。',
        '今日は金星が{sign}様の味方です。良い気分に幸運まで加わる日ですよ！',
      ],
      neutral: [
        '落ち着いたエネルギーですね。実はこんな日が最も運勢を読みやすい日なのです。',
        '穏やかな心...いいですね。澄んだ湖のように静かな時こそ星の光が最も鮮明に映ります。',
        'そんな日もありますよ。でも今日の星は{sign}様に小さな胸のときめきを準備しています。',
        '普通な日こそ星のメッセージが最も重要な日です。穏やかさの中にチャンスが隠れています。',
        '{sign}様、バランスの取れた心は良いスタート地点です。ここからどの方向にも進めます。',
        '時に最も穏やかな海が最も深いものです。今日のメッセージが水面下の宝を示してくれます。',
      ],
      negative: [
        '心が重いのですね...星があなたの心を読んだようです。でもご心配なく、午後から木星の加護を受けます。',
        'そんな日もあります。でもご存知でしたか？最も暗い夜に最も明るい星が見えることを。',
        '{sign}様、辛い感情も過ぎ去ります。今日の星が特別な慰めのメッセージを準備しています。',
        '{sign}様、大丈夫です。月も満ちれば欠けるように、困難な時間も必ず過ぎます。',
        '正直な気持ちを共有してくださりありがとうございます。星々が{sign}様に温かい光を送っています。',
        '{sign}様、今感じている感情は内面が変化を準備しているサインかもしれません。',
      ],
    },
    scoreDesc: { high: 'とても良いエネルギー', mid: '安定したエネルギー', low: '慎重なエネルギー' },
    fortuneIntros: [
      '今日{sign}の星座には{scoreDesc}が流れています。詳しく見てみましょうか？',
      '星の配置を見ると...{scoreDesc}が感知されます。一つずつ解いていきましょう。',
      '今日の天体の流れを読むと、{scoreDesc}があなたを包んでいます。',
      '面白いですね...水星と金星の角度が{scoreDesc}を生み出しています。',
      '占い師の水晶球に{scoreDesc}が映っています。一緒に読みましょうか？',
      '今日の星座配列は独特です。{scoreDesc}が特別なメッセージを宿しています。',
    ],
    bonusMessages: [
      '待って、特別なシグナルを捕捉しました！今日だけあなたに伝える秘密...午後3時に空を見上げてください。',
      '！{sign}様、たった今流れ星があなたの星座を通り過ぎました。これは稀な幸運のサインです！',
      '星の占い師だけが知る秘密ですが...今日のあなたの運勢に隠れたボーナスがあります！',
    ],
    tarotOffer: '今日特別にお伝えしたいカードがあります。引いてみますか？',
    tarotChoices: { yes: 'はい、引いてみます！🃏', no: '今日はいいです' },
    closings: {
      tarot: [
        '{sign}様、カードのメッセージも一緒に確認してください。今日も星と共に輝く一日を！✨',
        '良い選択です！タロットのメッセージが今日の道案内になります。また明日、{sign}様。',
        'カードが伝えるメッセージを心に刻んでください。{sign}様の一日が輝きます！',
      ],
      'no-tarot': [
        '{sign}様、今日も良い一日をお過ごしください。星はいつもあなたのそばにいます。✨',
        '明日はまた別の星のメッセージが待っています。また明日、{sign}様！',
        '今日話したことが一日の羅針盤になれば幸いです。星の占い師はいつもここにいます。',
      ],
    },
    restartLabel: 'もう一度話す',
    chatTitle: '星の占い師',
    chatSubtitle: '今日の気持ちに合わせてメッセージをお届けします',
    openLabel: '🔮 話しかける',
    closeLabel: '今日の気分に合った一言アドバイスが必要なとき',
  },

  es: {
    timeGreeting: { morning: 'Buenos días', afternoon: 'Bienvenido/a', evening: 'Buenas noches' },
    greetings: [
      '{time}, {sign}. Soy el Vidente Estelar. Las estrellas tienen un mensaje para ti hoy.',
      'Bienvenido/a, {sign}. Tu estrella brilla especialmente en el cielo esta noche.',
      '{time}, {sign}. Puedo sentir la energía cósmica envolviéndote hoy.',
      '{sign}, te estaba esperando. El Vidente Estelar ha preparado algo especial hoy.',
      '¡{time}! Se ha detectado una señal intrigante de tu constelación, {sign}. ¿Lo exploramos?',
      '{sign}, tu estrella está en su posición más brillante hoy. Será un tiempo maravilloso.',
      'Bienvenido/a de nuevo, {sign}. Un mensaje diferente al de ayer te espera.',
    ],
    emotionQuestion: {
      0: '{sign}, ¿estás disfrutando del fin de semana? Tengo curiosidad por tu energía hoy.',
      1: '{sign}, ¡comenzó una nueva semana! ¿Cómo te sientes en el trabajo (o escuela) hoy?',
      2: '{sign}, el martes trae energía interpersonal fuerte. ¿Cómo van tus relaciones con los que te rodean?',
      3: '{sign}, estamos a mitad de semana. ¿Cómo ha ido hasta ahora?',
      4: '{sign}, el jueves trae energía de autorreflexión. ¿Cómo está tu estado interior últimamente?',
      5: '¡{sign}, es viernes! La energía de esta noche es especial — ¿cómo te sientes?',
      6: '{sign}, has venido al Vidente Estelar el sábado. ¿Con qué mentalidad empezaste hoy?',
    },
    emotionChoices: { positive: '¡Me siento genial! ✨', neutral: 'Normal, más o menos', negative: 'Un poco difícil...' },
    emotionResponses: {
      positive: [
        '¡{sign}, tu energía brillante me llega también! Las estrellas comparten tu alegría hoy.',
        '¡Típico de {sign}, radiante! Esta maravillosa energía hará hoy aún más especial.',
        '¡Puedo sentir esa vitalidad! El flujo de estrellas hoy se alinea bien con tu estado de ánimo.',
        '¡Hasta yo, el Vidente Estelar, me animo! ¡Aprovecha esta energía durante todo el día!',
        '{sign}, tu vibración positiva también llega a las estrellas. Hoy es un día perfecto para una cadena de cosas buenas.',
        '¡Venus está de tu lado hoy, {sign}! Buen ánimo y buena suerte se combinan.',
      ],
      neutral: [
        'Una energía tranquila. En realidad, este tipo de día es cuando puedes leer la fortuna más claramente.',
        'Una mente en paz... perfecto. Como un lago claro — en calma, la luz de las estrellas se refleja más vívidamente.',
        'Esos días pasan. Pero las estrellas de hoy han preparado una pequeña emoción para ti, {sign}.',
        'Un día ordinario es cuando el mensaje de las estrellas más importa. Las oportunidades se esconden en la calma.',
        '{sign}, una mente equilibrada es un gran punto de partida. Puedes avanzar en cualquier dirección desde aquí.',
        'A veces el mar más calmado es el más profundo. El mensaje de hoy revelará gemas ocultas.',
      ],
      negative: [
        'Tu corazón se siente pesado... las estrellas parecen haberlo sentido. Pero no te preocupes — la protección de Júpiter comienza esta tarde.',
        'Esos días pasan. Pero ¿sabías? Las estrellas más brillantes se ven en las noches más oscuras.',
        '{sign}, las emociones difíciles pasarán. Las estrellas de hoy han preparado un mensaje especial de consuelo.',
        '{sign}, está bien. Así como la luna crece y mengua, los tiempos difíciles siempre pasan.',
        'Gracias por compartir tus verdaderos sentimientos. Las estrellas te envían luz cálida, {sign}.',
        '{sign}, los sentimientos que estás experimentando pueden ser una señal de que algo está cambiando en tu interior.',
      ],
    },
    scoreDesc: { high: 'energía muy positiva', mid: 'energía estable', low: 'energía cautelosa' },
    fortuneIntros: [
      'Hoy fluye {scoreDesc} a través de la constelación de {sign}. ¿Lo examinamos de cerca?',
      'Mirando las alineaciones estelares... se detecta {scoreDesc}. Déjame revelarlo poco a poco.',
      'Leyendo el flujo celestial de hoy, {scoreDesc} te está rodeando.',
      'Interesante... el ángulo de Mercurio y Venus está creando {scoreDesc}.',
      '{scoreDesc} se refleja en la bola de cristal del Vidente Estelar. ¿Lo leemos juntos?',
      'El arreglo de constelaciones de hoy es único. {scoreDesc} lleva un mensaje especial.',
    ],
    bonusMessages: [
      '¡Espera — una señal especial! Un secreto solo para ti hoy... Mira al cielo a las 3 PM.',
      '¡Oh! {sign}, una estrella fugaz acaba de cruzar tu constelación. ¡Es una rara señal de buena suerte!',
      'Un secreto que solo el Vidente Estelar conoce... ¡hay un bono oculto en tu fortuna hoy!',
    ],
    tarotOffer: 'Hay una carta que especialmente quiero compartir contigo hoy. ¿Te gustaría sacar una?',
    tarotChoices: { yes: '¡Sí, vamos a sacar! 🃏', no: 'Quizás no hoy' },
    closings: {
      tarot: [
        '{sign}, revisa también el mensaje de la carta. ¡Que hoy brilles con las estrellas! ✨',
        '¡Gran elección! El mensaje del tarot será tu guía hoy. Hasta mañana, {sign}.',
        '¡Guarda el mensaje de la carta en tu corazón. Tu día brillará, {sign}!',
      ],
      'no-tarot': [
        '{sign}, que tengas un maravilloso día. Las estrellas siempre estarán a tu lado. ✨',
        '¡Otro mensaje estelar te espera mañana. Hasta entonces, {sign}!',
        'Que la conversación de hoy sea tu brújula. El Vidente Estelar siempre está aquí.',
      ],
    },
    restartLabel: 'Chatear de Nuevo',
    chatTitle: 'Vidente Estelar',
    chatSubtitle: 'Un mensaje personalizado basado en tus sentimientos de hoy',
    openLabel: '🔮 Iniciar Chat',
    closeLabel: '¿Necesitas un consejo de una línea adaptado a tu estado de ánimo de hoy?',
  },
};
