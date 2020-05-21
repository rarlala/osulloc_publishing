$(function() {

  // 헤더 고정

  // -------------------------------------------------------------------------

  // 메뉴 n번째 선택 시 해당하는 ul의 색상 변경

  // -------------------------------------------------------------------------

  // weekly-best 내 li hover 효과
  // 1. list-style: none; [미해결]
  // 2. 이미지 바꾸기 [해결]
  // 3. 리뷰보기 | 장바구니 표시 [해결]

  var $weeklylist = $('.weekly-best .review-rank-container li')

    $weeklylist
        .on('mouseover', function() {
            var img_src = $(this).find('img').attr("src");
            var new_img_src = img_src.split('.')[1];
            $(this).find('img').css('opacity', '0').stop().attr("src", '.' + new_img_src + '-1.png').animate({
                opacity: 1
            }, 500);
            $(this).find('.detail').removeClass('hidden');
        })
        .on('mouseout', function() {
            var img_src = $(this).find('img').attr("src");
            var new_img_src = img_src.split('-')[0];

            $(this).find('img').css('opacity', '0').stop().attr("src", new_img_src + '.png').animate({
                opacity: 1
            }, 500);
            $(this).find('.detail').addClass('hidden');
        })

  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------

  // visual-slide

  // 1. n초마다 아래 'slide-select-area' 영역의 배경이 채워져야한다. [완료]
  // 2. n초마다 이미지가 바뀌어야한다. [완료]
  // 3. 특정 'slide-select-area' 클릭 시 해당하는 영역의 배경이 나타나야한다. [보류]
  // 4. 일시정지 버튼 클릭 시 시작버튼으로 바뀌어야한다.[완료]
  // 5. 일시정지 버튼 클릭 시 움직이던 시간을 멈춰야한다.[완료]

  var $visualSlide = $('.visual .img-slide'),
    $nowSlide = $visualSlide.find('.active').index(),
    $slideNum = $visualSlide.find('a').length;

  var $selectList = $('.visual .slide-select-area ul'),
    $nowSelect = $selectList.find('.active').index(),
    $selectNum = $selectList.find('li').length;

  var NextSlide = function () {
    console.log('실행');

    $visualSlide.find('a').eq($nowSlide).removeClass('active');
    $nowSlide = ($nowSlide + 1) % $slideNum;
    $visualSlide.find('a').eq($nowSlide).addClass('active');

    $selectList.find('li').eq($nowSelect).removeClass('active');
    $nowSelect = ($nowSelect + 1) % $selectNum;
    $selectList.find('li').eq($nowSelect).addClass('active');
  };

  var repeat = setInterval(NextSlide, 5000);

  $('.visual .btn-slide-state').on('click', function () {
    if ($(this).hasClass('stop')) {
      $(this).removeClass('stop');
      $(this).addClass('start');
      clearInterval(repeat);
    } else {
      $(this).removeClass('start');
      $(this).addClass('stop');
      repeat = setInterval(NextSlide, 5000);
    }
  });

  //   $selectList.find('li').on('click', function () {
  //     $selectList.find('.active').removeClass('active');
  //     $visualSlide.find('.active').removeClass('active');

  //     $selectNum = $(this).index();
  //     console.log($nowSelect, $selectNum);

  //     $visualSlide.find('a').eq($selectNum).addClass('active');
  //     $(this).eq($selectNum).addClass('active');
  //   });

  // -------------------------------------------------------------------------

  // 시계

  var $timer = $('.today-price .timer');

  setInterval(function () {
    const nowTime = new Date();
    const hours = nowTime.getHours();
    const minutes = nowTime.getMinutes();
    const seconds = nowTime.getSeconds();

    const time = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);

    $timer.text(time);
  }, 1000);

  // -------------------------------------------------------------------------

  // top button 클릭 시 맨 위로 움직이게 하기
  var $window = $(window),
    $btnTop = $('.btn-top'),
    $scrollableElement = $('html', 'body');

    $window.scroll(function() {
        if ($window.scrollTop() > 300) {
            $btnTop.stop(true).animate({
                right: '10px'
            }, 200)
      $btnTop.removeClass('hidden');
    } else {
        $btnTop.stop(true).animate({
            right: '-100px'
        }, 200);
      $btnTop.addClass('hidden');
    }
  });

  $btnTop.on('click', function(e) {
    $scrollableElement.animate({
        scrollTop: 0
    }, 1000, 'swing');
})

  $window.trigger('scroll');
});