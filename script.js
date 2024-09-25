const arrayContainer = document.getElementById('array-container');
const startButton = document.getElementById('start-button');
const algorithmSelect = document.getElementById('algorithm-select');

let arr = [64, 34, 25, 12, 22, 11, 90];

// Function to create bars
function createBars(array) {
    arrayContainer.innerHTML = ''; // Clear previous bars
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 4}px`; // Scale height for better visibility
        arrayContainer.appendChild(bar);
    });
}

// Bubble Sort visualization
async function bubbleSort(array) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            createBars(array);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap
            }
            createBars(array);
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay for visualization
        }
        document.querySelectorAll('.bar')[n - i - 1].classList.add('sorted');
    }
}

// Selection Sort visualization
async function selectionSort(array) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            createBars(array);
            if (array[j] < array[minIndex]) {
                minIndex = j; // Find index of the minimum element
            }
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay for visualization
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]]; // Swap
        }
        createBars(array);
        document.querySelectorAll('.bar')[i].classList.add('sorted');
    }
}

// Insertion Sort visualization
async function insertionSort(array) {
    const n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            createBars(array);
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay for visualization
        }
        array[j + 1] = key;
        createBars(array);
        document.querySelectorAll('.bar')[i].classList.add('sorted');
    }
}

// Merge Sort visualization
async function mergeSort(array) {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = await mergeSort(array.slice(0, mid));
    const right = await mergeSort(array.slice(mid));

    return merge(left, right, array);
}

async function merge(left, right, originalArray) {
    const sortedArray = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sortedArray.push(left.shift());
        } else {
            sortedArray.push(right.shift());
        }
        createBars([...sortedArray, ...left, ...right]);
        await new Promise(resolve => setTimeout(resolve, 500)); // Delay for visualization
    }
    const mergedArray = [...sortedArray, ...left, ...right];
    for (let i = 0; i < mergedArray.length; i++) {
        originalArray[i] = mergedArray[i];
        createBars(originalArray);
        await new Promise(resolve => setTimeout(resolve, 500)); // Delay for visualization
    }
    return originalArray;
}

// Quick Sort visualization
async function quickSort(array, left = 0, right = array.length - 1) {
    if (left < right) {
        const pivotIndex = await partition(array, left, right);
        await quickSort(array, left, pivotIndex - 1);
        await quickSort(array, pivotIndex + 1, right);
    }
}

async function partition(array, left, right) {
    const pivot = array[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        createBars(array);
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    [array[i + 1], array[right]] = [array[right], array[i + 1]];
    createBars(array);
    return i + 1;
}

// Start sorting based on selected algorithm
startButton.addEventListener('click', () => {
    const selectedAlgorithm = algorithmSelect.value;
    const arrayCopy = [...arr]; // Pass a copy of the array
    createBars(arrayCopy); // Initial display
    if (selectedAlgorithm === 'bubble') {
        bubbleSort(arrayCopy);
    } else if (selectedAlgorithm === 'selection') {
        selectionSort(arrayCopy);
    } else if (selectedAlgorithm === 'insertion') {
        insertionSort(arrayCopy);
    } else if (selectedAlgorithm === 'merge') {
        mergeSort(arrayCopy);
    } else if (selectedAlgorithm === 'quick') {
        quickSort(arrayCopy);
    }
});

// Initial setup
createBars(arr);
