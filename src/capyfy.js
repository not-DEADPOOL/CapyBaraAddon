const INTERVAL_KEY = "INTERVAL_KEY";
// default to 1s refresh window
const DEFAULT_INTERVAL = "1000";

const CAPIS = [//I've just replaced Nicolas Cage's images with capybaras 
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Capybara_%28Hydrochoerus_hydrochaeris%29.JPG/1200px-Capybara_%28Hydrochoerus_hydrochaeris%29.JPG", // wikipedia Capybara 1
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Bristol.zoo.capybara.arp.jpg/1200px-Bristol.zoo.capybara.arp.jpg", // wikipedia Capybara 2
    "https://cdn.britannica.com/77/191677-050-3CBF2834/Capybara.jpg", // enciclopedia Capybara
    "https://inaturalist-open-data.s3.amazonaws.com/photos/91546944/large.jpg", // sitting capy
    "https://s7d2.scene7.com/is/image/TWCNews/akron-zoo-capybara-oh-102522_10252022", // sitting capy2
    "https://www.hellabrunn.de/fileadmin/_processed_/d/8/csm_wasserschwein-tierpark-hellabrunn-amerika-tierlexikon_f6feb22d52.jpg", //sitting 3
    "https://www.savacations.com/wp-content/uploads/2021/02/Blog-Capybara-Pantanal-Brazil3.jpg", //sitting 4
    "https://img.freepik.com/premium-photo/cute-capybara-farm-is-taking-bath_361141-902.jpg", //smiling 
    "https://people.com/thmb/ovi1vkp7e_cTTPC5LglB_Ii83n0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(149x0:151x2)/capybara-1-300-dbd2c51946de4b989723201dac1f20ff.jpg", //screaming
    "https://static01.nyt.com/images/2022/06/28/science/14tb-giantrodents/14tb-giantrodents-superJumbo.jpg", //stretching
    "https://upload.wikimedia.org/wikipedia/commons/8/8e/Yellow-headed_caracara_%28Milvago_chimachima%29_on_capybara_%28Hydrochoeris_hydrochaeris%29.JPG", //with birb
    "https://www.thealexandriazoo.com/images/animals/Capybara02.jpg",//thinking 
    "https://www.jungleisland.com/wp-content/uploads/2022/07/capybara-gallery-4.jpg", //eating
    "https://www.dartmoorzoo.org.uk/wp-content/uploads/2020/10/Capybara-1.png", //sitting 5
    "https://images.foxtv.com/static.fox35orlando.com/www.fox35orlando.com/content/uploads/2021/06/764/432/Capybara-on-Gatorland-Flamingo-Island.jpg?ve=1&tl=1",//with flamingo 
    "https://api.time.com/wp-content/uploads/2016/06/dog-capybara-friends.jpg?quality=85&w=1092", //with dog
    "https://www.highparkzoo.ca/wp-content/uploads/2021/03/Capybara-site-sm.jpg",//double sitting
    "https://critter.science/wp-content/uploads/2018/09/capybara1a-scaled.jpg", //sitting 6
    "http://taronga.org.au/sites/default/files/content/header-images/header-tz-whats-on-capybaras-compressed-2880x1400.jpg", //eating 2
    "https://gifts.worldwildlife.org/gift-center/Images/large-species-photo/large-capybara-photo.jpg", //face 
    "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg", //stare
    "https://app.digitickets.co.uk/userfiles/products/caybaras.1200x630.jpg",//looking for something
    "https://www.thesprucepets.com/thmb/vg_tWh3npV1iZr24seq2_5RNN7g=/2119x0/filters:no_upscale():strip_icc()/GettyImages-590084935-57fc0b545f9b586c35c9daae.jpg", //ambush
    "https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F037%2F615%2Fcover2.jpg",//smiling2
    "https://creativepark.canon/images/contents/CNT-0027974/CNT-0027974_detail-01_s@2x.jpg", //paper
    "https://zooboise.org/content/uploads/2015/07/dreamstime_15775602.jpg", //water
    "https://i.ytimg.com/vi/ClVV3BU2R28/hqdefault.jpg", //ok he pull up
    "https://preview.redd.it/az3nid9sc9i81.jpg?width=640&crop=smart&auto=webp&s=46237c467cfb665dcc1ec92c80a5a49ee58fdfa5", //sing
]

function getCap() {
    let capNum = Math.floor(Math.random()*CAPIS.length);
    return CAPIS[capNum];
}

function replaceImages() {
    for(let i = 0; i < document.images.length; ++i) {
        let img = document.images[i];

        if(img.classList.contains('nicced')){
            continue;
        }
        img.classList.add('nicced');

        // attempt to retain the original dimensions
        img.style.width = img.width + 'px';
        img.style.height = img.height + 'px';

        // nic-em
        let loc = getCap()
        img.src = loc;
        if(img.srcset){
            img.srcset = loc;
        }
    };
}

// setup defaults
function get_interval_or_default(item) {
    if (!item || item === {} || !(INTERVAL_KEY in item)) {
        browser.storage.local.set({
            INTERVAL_KEY: DEFAULT_INTERVAL
        });
        return DEFAULT_INTERVAL;
    } else {
        return item[INTERVAL_KEY];
    }
}

// start up the extension
browser.storage.local.get().then(
    (item) => {
        let interval = get_interval_or_default(item);
        window.setInterval(replaceImages, interval);
    },
    (_) => {
        window.setInterval(replaceImages, DEFAULT_INTERVAL);
    }
);
