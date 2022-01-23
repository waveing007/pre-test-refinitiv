angular.module('ngApp', [])


    .controller('Controller', ['$scope', function ($scope) {
        $scope.funcCalNumber = (number) => {
            let value = number.target.value;
            console.log(value);

            if (Math.sign(value) == -1) { value = 1 }
            console.log(value);

            value = Math.round(value);
            console.log(value);
            $scope.inputNumberData = value;

            // function
            checkisPrimeOrisFibonacci();
        }

        $scope.selectFormValue = 'isPrime';

        $scope.listOptionData = [
            { name: 'isPrime' },
            { name: 'isFibonacci' }
        ];

        $scope.changeSelectForm = () => {
            checkisPrimeOrisFibonacci();
        }

        const checkisPrimeOrisFibonacci = () => {
            $scope.value = null;

            let type = $scope.selectFormValue;
            let number = $scope.inputNumberData;

            if (number || number == 0) {
                if (type == 'isPrime') {
                    $scope.value = isPrime(number);
                } else if (type == 'isFibonacci') {
                    $scope.value = isFibonacci(number);
                }
            }
        }

    }])

const isFibonacci = (query, count = 1, last = 0) => {
    if (count < query) {
        return isFibonacci(query, count + last, count);
    };
    if (count === query) {
        return true;
    }
    return false;
};

const isPrime = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
    return num > 1;
}