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

const nextBtn = $('.btn-next')
const backBtn = $('.btn-back')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')

const btnVolum = $('.fa-volum')
const volumProgress = $('.volum-progress')



const app  = {
    currentIndex : 0,
    isPlaying: false,// có cũng được ko có cũng được
    isRandom: false,// có cũng được ko cũng được
    isRepeat: false,
    isVolum:false,
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
            path: './music/y2meta.com - QNT - EM KHÔNG ĐI ĐÂU ft. Gii (MV LYRICS) (320 kbps).mp3',
            image: './img/picture-song/QNT.jpg',
    
        },
        {
            name : 'Hello',
            singer: 'Adele',
            path: './music/Hello.mp3',
            image: './img/picture-song/helo.jpg',
    
        },
        {
            name : 'Cupid',
            singer: 'FIFTY FIFTY',
            path: './music/Cupid.mp3',
            image: './img/picture-song/cupid.jpg',
    
        },
        {
            name : 'Người Đáng Thương Là Anh',
            singer: 'OnlyC',
            path: './music/NGƯỜI ĐÁNG THƯƠNG LÀ ANH.mp3',
            image: './img/picture-song/OnlyC.jpg',
    
        },
    ],
    render: function() {
        const htmls = this.songs.map((song, index)  => {
           
            return ` 
            <div class="song ${index === app.currentIndex ? 'active' : ''}" data-index="${index}">
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
                    duration : 10000 ,
                    iterations: Infinity
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
                const durations = audio.duration
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
                return durations
               }
            }
            
            
            
            
            // khi tua bài hát
            progress.onchange = function(e) {
                const seekTime = audio.duration / 100 * e.target.value
                audio.currentTime = seekTime
                console.log(seekTime)
                
            }
            
            // khi next bài hát
            nextBtn.onclick = function() {
                if(app.isRandom) {
                    app.randomSong()
                } else {
                    app.nextSong()
                }
                audio.play()
                app.render()
                app.scrolltoActive()
            }

            // khi lùi bài hát
            backBtn.onclick = function() {
                if(app.isRandom) {
                    app.randomSong()
                } else {
                    app.backSong()
                }
                audio.play()
                app.render()
            }

            
            // khi bài hát kết thúc
            audio.onended = function() {
                if(app.isRandom) {
                    app.randomSong()
                } else if (app.isRepeat) {
                    audio.onloop = true // lặp bài hát
                } else {
                    app.nextSong()
                }
                audio.play()
                app.render()
            }

            // xử lý bật tắt random
            btnRandom.onclick = function() {
                // if(app.isRandom == true){
                //     btnRandom.classList.remove('active')
                //     app.isRandom = false
                // } else if (app.isRandom == false) {
                //     btnRandom.classList.add('active')
                //     app.isRandom = true
                // }

                app.isRandom = !app.isRandom
                this.classList.toggle('active', app.isRandom) //phương thức sẽ xóa `active`trả về giá trị `false`. Nếu chưa có sẽ thêm `active` trả về giá trị `true`.
           
            }

            // bắt tắt lặp bài hát
            btnRepeat.onclick = function() {
                app.isRepeat = !app.isRepeat
                this.classList.toggle('active', app.isRepeat) 
                

            }

            playlist.onclick = function(e) {
                const songNode = e.target.closest('.song:not(.active)')

                if(songNode || e.target.closest('.option')) {
                    
                    // xử lí khi ấn vào song
                    if(songNode) {
                         app.currentIndex = Number(songNode.dataset.index) 
                        app.loadCurrentSong()
                        app.render()
                        audio.play()
                    }

                    
                }
            }

            // tăng giảm âm lượng
            volumProgress.onchange = function(e) {
              const audioVol =  e.target.value
              audio.volume = audioVol / 100
              

            }

            // bật tắt volum 
            btnVolum.onclick = function() {
                app.isVolum = !app.isVolum
                this.classList.toggle('fa-volume-xmark', app.isVolum)
            }
    },
    // load ra bài hát 
    loadCurrentSong: function() {
    

       heading2.textContent = this.currentSong.name
       cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
      audio.src = this.currentSong.path
    },
    // logic next bài
    nextSong : function() {
        this.currentIndex++
        console.log(this.currentIndex, this.songs.length)
        if(this.currentIndex >= this.songs.length) {
             this.currentIndex = 0;
        }

        this.loadCurrentSong()
    },
    // logic lùi bài
    backSong : function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length -1;   
        }
        this.loadCurrentSong()
    },
    // logic random bài
    randomSong: function() {
            let newIndex 

            do {
                newIndex = Math.floor(Math.random() * app.songs.length)
            } while(newIndex === this.currentIndex)
            this.currentIndex = newIndex
            this.loadCurrentSong()
    },

    //logic khi active thẻ bài hát view đưa theo
    scrolltoActive: function() {
            setTimeout(() => {
                $('.song.active').scrollIntoView({
                    behavior : 'smooth',
                    block : 'center',
                })
            } , 300)
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