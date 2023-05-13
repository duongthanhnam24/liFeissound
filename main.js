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

const cd = $('.cd-music')
const playlist = $('.play-list')
const heading2 = $('h2')
const cdThumb = $('.cd-pic')
const audio = $('#audio')
const btnPlay = $('.btn-play')
const iconPlay = $('.fas')
const progress = $('#progress')
const timeSong = audio.duration * 1000
console.log(timeSong)



const app  = {
    currentIndex : 0,
    isPlaying: false,
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
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        }) 
    },

    handleEvents: function() {
       // xử lí cuộn kéo
        const cdWidth = cd.offsetWidth
            document.onscroll = function() {
                console.log(123)
            }


            // cd quay 
                const cdAnimation = cdThumb.animate([
                    {transform : 'rotate(360deg)'}
                ] , {
                    duration :10000 ,
                    interation: Infinity
                    })
                    cdAnimation.pause()

        // xử lí khi click play chạy nhạc
            btnPlay.onclick = function() {
                // logic
                if(app.isPlaying) {
                    audio.pause()
                } else {
                    audio.play()
                }            
            }

              // khi nhạc phát thực hiện chức năng thay đổi nút thành play
              audio.onplay = function() {
                app.isPlaying = true
                iconPlay.classList.remove('fa-circle-play')
                iconPlay.classList.add('fa-pause')
                cdAnimation.play()
            }
                // khi pause
            audio.onpause = function() {
                app.isPlaying = false
                iconPlay.classList.remove('fa-pause')
                iconPlay.classList.add('fa-circle-play')
                cdAnimation.pause()

            }

            // khi bài hát đang chạy 
            audio.ontimeupdate = function() {
                
               if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                
                progress.value = progressPercent
               }
            }

            // khi tua bài hát
            progress.onchange = function(e) {
                    const seekTime = audio.duration / 100 * e.target.value
                    audio.currentTime = seekTime
            }

            
            
            
            
       
    },

    loadCurrentSong: function() {
    

       heading2.textContent = this.currentSong.name
       cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
      audio.src = this.currentSong.path
    },

    start: function() {
        this.changebg()
        
        // định nghĩa các thuộc tính cho obj
        this.defineProperties()
        
        // lắng nghe xử lý các sự kiện(dom events)
        this.handleEvents()

        // tải thông tin bài hát đầu tiên vào UI 
        this.loadCurrentSong()
        // đổ dữ liệu
        this.render()
       



    },

    
    
}

app.start()