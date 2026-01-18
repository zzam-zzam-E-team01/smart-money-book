# Assets ?대뜑 援ъ“

???대뜑??CSS? JavaScript ?뚯씪?ㅼ쓣 泥닿퀎?곸쑝濡?愿由ы븯湲??꾪븳 ?대뜑?낅땲??

## ?뱚 ?대뜑 援ъ“

```
assets/
?쒋?? css/
??  ?쒋?? main.css                    # 紐⑤뱺 ?섏씠吏 怨듯넻 ?ㅽ?????  ?붴?? account/
??      ?쒋?? account-card.css        # ?붿빟 移대뱶 ?ㅽ???(list, stats 怨듭쑀)
??      ?쒋?? account-form.css        # ???ㅽ???(form, edit 怨듭쑀)
??      ?쒋?? list.css               # list.html ?꾩슜
??      ?붴?? stats.css              # stats.html ?꾩슜
?붴?? js/
    ?쒋?? main.js                     # 紐⑤뱺 ?섏씠吏 怨듯넻 ?ㅽ겕由쏀듃
    ?붴?? account/
        ?쒋?? account-form.js         # ??湲곕뒫 (form, edit 怨듭쑀)
        ?쒋?? list.js                # list.html ?꾩슜
        ?쒋?? form.js                # form.html ?꾩슜
        ?쒋?? edit.js                # edit.html ?꾩슜
        ?붴?? stats.js               # stats.html ?꾩슜
```

## ?렞 3怨꾩링 援ъ“

### 1. 怨듯넻 ?뚯씪 (紐⑤뱺 ?섏씠吏)
- **main.css**: 湲곕낯 ?덉씠?꾩썐, 硫붿씤 移대뱶 ?ㅽ???- **main.js**: ?좏떥由ы떚 ?⑥닔 (?レ옄 ?щ㎎, ?좎쭨 ?щ㎎ ??

### 2. 怨듭쑀 ?뚯씪 (?쇰? ?섏씠吏)
- **account-card.css**: list.html, stats.html?먯꽌 ?ъ슜?섎뒗 ?붿빟 移대뱶
- **account-form.css**: form.html, edit.html?먯꽌 ?ъ슜?섎뒗 ???ㅽ???- **account-form.js**: form.html, edit.html?먯꽌 ?ъ슜?섎뒗 ??湲곕뒫

### 3. 媛쒕퀎 ?뚯씪 (媛??섏씠吏)
- **list.css / list.js**: 紐⑸줉 ?섏씠吏 ?꾩슜
- **stats.css / stats.js**: ?듦퀎 ?섏씠吏 ?꾩슜 (Chart.js)
- **form.js**: 異붽? ?섏씠吏 ?꾩슜 (珥덇린??濡쒖쭅)
- **edit.js**: ?섏젙 ?섏씠吏 ?꾩슜 (珥덇린??濡쒖쭅)

## ?뱦 ?ъ슜 諛⑸쾿

### HTML?먯꽌 濡쒕뱶?섍린

媛??섏씠吏???꾩슂???뚯씪?ㅻ쭔 濡쒕뱶?⑸땲??

#### list.html
```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/account/account-card.css">
<link rel="stylesheet" href="../assets/css/account/list.css">

<script src="../assets/js/main.js"></script>
<script src="../assets/js/account/list.js"></script>
```

#### form.html
```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/account/account-form.css">

<script src="../assets/js/main.js"></script>
<script src="../assets/js/account/account-form.js"></script>
<script src="../assets/js/account/form.js"></script>
```

#### edit.html
```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/account/account-form.css">

<script src="../assets/js/main.js"></script>
<script src="../assets/js/account/account-form.js"></script>
<script src="../assets/js/account/edit.js"></script>
```

#### stats.html
```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/account/account-card.css">
<link rel="stylesheet" href="../assets/css/account/stats.css">

<script src="../assets/js/main.js"></script>
<script src="../assets/js/account/stats.js"></script>
```

## ?뮕 ?μ젏

1. **?좎?蹂댁닔??*: 怨듯넻 ?ㅽ????ㅽ겕由쏀듃瑜???怨녹뿉??愿由?2. **?ъ궗?⑹꽦**: ?щ윭 ?섏씠吏?먯꽌 怨듭쑀?섎뒗 肄붾뱶 以묐났 ?쒓굅
3. **媛?낆꽦**: HTML ?뚯씪??媛꾧껐?댁?怨??듭떖 援ъ“??吏묒쨷 媛??4. **?깅뒫**: ?꾩슂???뚯씪留?濡쒕뱶?섏뿬 理쒖쟻??5. **?뺤옣??*: ?덈줈???섏씠吏 異붽? ??湲곗〈 ?뚯씪 ?ъ궗??媛??
## ?뵩 ?섏젙 媛?대뱶

### 怨듯넻 ?ㅽ????섏젙
??`css/main.css` ?섏젙 (紐⑤뱺 ?섏씠吏???곹뼢)

### ?붿빟 移대뱶 ?ㅽ????섏젙
??`css/account/account-card.css` ?섏젙 (list, stats???곹뼢)

### ??湲곕뒫 ?섏젙
??`js/account/account-form.js` ?섏젙 (form, edit???곹뼢)

### ?뱀젙 ?섏씠吏留??섏젙
???대떦 ?섏씠吏???꾩슜 ?뚯씪 ?섏젙 (?ㅻⅨ ?섏씠吏???곹뼢 ?놁쓬)

## ?뱷 肄붾뱶 而⑤깽??
- CSS: BEM 諛⑹떇 沅뚯옣
- JavaScript: ES6+ 臾몃쾿 ?ъ슜
- 二쇱꽍: 媛??뚯씪 ?곷떒???⑸룄 紐낆떆
- ?⑥닔: 紐낇솗???대쫫怨?JSDoc 二쇱꽍

