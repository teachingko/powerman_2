document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const numberElements = document.querySelectorAll('.number');

    function generateLotteryNumbers() {
        // 1부터 45까지의 숫자 배열 생성
        const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
        
        // Fisher-Yates 알고리즘을 사용하여 배열 섞기
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        
        // 앞에서 6개 숫자 선택
        const selectedNumbers = numbers.slice(0, 6).sort((a, b) => a - b);
        
        // 선택된 숫자를 화면에 표시 (애니메이션 효과 추가)
        numberElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'scale(0.5)';
            
            setTimeout(() => {
                element.textContent = selectedNumbers[index];
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }, index * 200);
        });

        // SweetAlert2로 축하 메시지 표시
        Swal.fire({
            title: '번호가 생성되었습니다!',
            text: '행운을 빕니다!',
            icon: 'success',
            confirmButtonText: '확인',
            confirmButtonColor: '#4CAF50',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    }

    // 버튼 클릭 이벤트 리스너
    generateBtn.addEventListener('click', () => {
        // 버튼 클릭 시 로딩 효과
        Swal.fire({
            title: '번호 생성 중...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false
        }).then(() => {
            generateLotteryNumbers();
        });
    });
    
    // 페이지 로드 시 초기 번호 생성
    generateLotteryNumbers();
});
