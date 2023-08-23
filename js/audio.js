let audio = document.querySelector('.quranPlayer'),
    surahContainer = document.querySelector('.surahs'),
    ayah = document.querySelector('.ayah'),
    next = document.querySelector('.next'),
    prev = document.querySelector('.previous'),
    play = document.querySelector('.play'),
    title = document.getElementById('title');

getSurahs();

function getSurahs() {
    fetch('audioquran.json')
        .then(res => res.json())
        .then(data => {
            console.log(data.data);
            for (let surah in data.data) {
                surahContainer.innerHTML += `
                
        <div class="surahs">

                <h3>${data.data[surah].number}.   ${data.data[surah].asma.ar.long} </h3>
                <img class="ar" src="${data.data[surah].asma.ar.short}" alt="" class="image">
                <p>${data.data[surah].asma.en.long} (${data.data[surah].asma.translation.en})</p>
             
        </div>
  

                `


            }

            // <div class="surahs">

            //     <p class="ar">${data.data[surah].asma.ar.long}</p>
            //     <p>${data.data[surah].asma.en.long} (${data.data[surah].asma.translation.en})</p>

            // </div>


            // select all surahs
            let allSurahs = document.querySelectorAll('.surahs div');
            let index;

            allSurahs.forEach((surah, idx) => {
                surah.addEventListener('click', () => {
                    index = idx;
                    play(index);
                })
            })

        
            
            prev.addEventListener('click', () => {
                (index > 0) ? index-- : index;
                play(index);
            })

            next.addEventListener('click', () => {
                (index < 114) ? index++ : index;
                play(index);
            })


            function play(idx) {
                console.log(idx);
                audio.src = data.data[idx].recitation.full;
                title.innerText = `${idx+1}. ${data.data[idx].asma.ar.long}`;
            }

        })
}