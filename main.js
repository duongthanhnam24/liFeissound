/**
    * 1. Render songs
    * 2. Scroll top
    * 3. Play/ pause / seek
    * 4. CD rotate
    * 5. Next / prev
    * 6. Random
    * 7. Next / Repeat when ended
    * 8. Active song 
    * 9. Scroll active song into view
    * 10. Play song when click
 */

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.play-list')






const app  = {
    currentIndex : 0,
    
   songs: [
        {
            name : 'ONLY',
            singer: 'Lee Hi',
            path: './music/ONLY.mp3',
            image: './img/picture-song/Lee-Hi3.jpg',
    
        },
        {
            name : 'スピードデーモン',
            singer: 'HXVRMXN',
            path: './music/HXVRMXN.mp3',
            image: './img/picture-song/maxresdefault.jpg',
    
        },
        {
            name : 'dự báo thời tiết hôm nay mưa',
            singer: 'GRAY D',
            path: './music/dự báo thời tiết hôm nay mưa.mp3',
            image: './img/picture-song/gred.jpg',
    
        },

        {
            name : 'Don\'t you say goodbye',
            singer: 'Minh đinh',
            path: './music/don\'t you say goodbye.mp3',
            image: './img/picture-song/minhdinh.jpg',
    
        },
        {
            name : 'Em không đi đâu',
            singer: 'QNT',
            path: './music/Em Không Đi Đâu.mp3',
            image: './img/picture-song/QNT.jpg',
    
        },
        {
            name : 'a',
            singer: 'QNT',
            path: './music/Em Không Đi Đâu.mp3',
            image: './img/picture-song/QNT.jpg',
    
        },
        {
            name : 'b',
            singer: 'QNT',
            path: './music/Em Không Đi Đâu.mp3',
            image: './img/picture-song/QNT.jpg',
    
        },
        {
            name : 'c',
            singer: 'QNT',
            path: './music/Em Không Đi Đâu.mp3',
            image: './img/picture-song/QNT.jpg',
    
        },
    ],
    render: function() {
        const htmls = this.songs.map(song => {
            return ` 
            <div class="song">
            <div class="pic-song" style="background-image: url(${song.image});"></div>
            
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>

            <div class="option">
                <i class="fa-solid fa-ellipsis"></i>
            </div>
        </div>`
        })

        playlist.innerHTML = htmls.join('')
    },


    changebg: function() {
        const btnSun = $('.btn-sun')
        const btnMoon = $('.btn-moon')
        const container = $('.container')

        btnSun.onclick = function() {
            $('.container.bgmoon').classList.remove('bgmoon')
             $('h1').style.color = "black"
            container.classList.add('bgsun')
        }

        btnMoon.onclick = function() {
            $('.container.bgsun').classList.remove('bgsun')
            $('h1').style.color = "#fff"
            container.classList.add('bgmoon')

            
        }
    },

    defineProperties: function() {
        Object.definePropertie(this, 'currentSong', {
            get: function() {
                console.log(123)
            }
        }) 
    },

    handleEvents: function() {
        const cd = $('.cd-music')
        const cdWidth = cd.offsetWidth
        
            document.onscroll = function() {
                console.log(123)
            }
    },

    start: function() {
        this.changebg()
        this.handleEvents
        
        
        
        this.render()
    },

    
    
}

app.start()