/**思路：
 * 有一个setImagess函数，调用后可以知道当前应该加载哪些图片
 * 如果有这个函数以后，在滚动条滚动的的时候调用监听，然后将处理函数进行一个防抖处理
 * 在setImagess方法里面要在很多图片里面找到需要加载的图片，首先肯定要找到很多图片，从这些图片里面一个一个去找 ，所以需要一个数组来储存
  当我们切换页面的时候，之前数组中的东西其实是可以删除的，因为我们只需要拿到当前页所有文章列表的图片，所以在切换页面以后，需要将之前的页面中的图删除
  所以可以在unbind钩子函数里面将这个数组中找到img的dom不等于切换后的dom的时候，我们就把他过滤掉，然后给img重新赋值

  然后setImages方法里面处理图片，可以重新写一个专门处理图片的函数，然后在setImages方法里面for-of循环，将每一个img元素放到setImage方法里面处理
 */
import eventBus from "@/eventBus";
import debounce from "@/utils/debounce.js"
import defaultGif from "@/assets/default.gif";


// 具体处理图片汉函数
function setImage(img) {
    img.dom.src = defaultGif; //先暂时使用默认图片
    // 处理图片
    // 该图片是否在视口范围内
    const clientHeight = document.documentElement.clientHeight; // 视口高度
    const rect = img.dom.getBoundingClientRect(); //dom的位置属性
    const height = rect.height || 150; //最开始图片没有高度的时候，给一个最小高度


    if (rect.top >= -height && rect.top <= clientHeight) {
        //在视口范围内
        const tempImg = new Image()

        tempImg.onload = function() {
            // 当真实图片已经加载完了
            img.dom.src = img.src; //将真实的img.src替换之前的默认图片
            imgs = imgs.filter(i => i !== img) //处理完了就删除这个图片
        }
        tempImg.src = img.dom.src;

    }

    // 处理完了以后就在imgs数组中删除该图片
    // imgs = imgs.filter(i => i !== img)
}

// 调用该函数，设置加载合适的图片

let imgs = []; // 在指令被绑定在当前img元素的时候，就可以把这个img元素加进来，所以可以在钩子函数bind里面
function setImages() {
    for (const img of imgs) {
        setImage(img)
    }
}

function handlerScroll() {
    setImages()
}


eventBus.$on("mainScroll", debounce(handlerScroll, 50))

export default {
    inserted(el, bindings) {
        const img = {
            dom: el,
            src: bindings.value,
        }
        imgs.push(img)
            // 将图片加入进去以后马上处理，比如当我们页面刚打开的时候不做任何事情，我们也要有图片立即处理
        setImages(img);
    },
    unbind(el) {
        imgs = imgs.filter((img) => img.dom !== el)
    }
}