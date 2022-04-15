import Heap from './Heap';

const arr = [1, 2, 8, 9, 6, 5];

describe('Heap', () => {
  it('should create a max heap for the given array', () => {
    expect(new Heap(arr).size()).toEqual(6);
  });

  it('should create an empty max heap', () => {
    expect(new Heap().size()).toEqual(0);
  });

  it('should return undefined for peek() when the heap is empty', () => {
    expect(new Heap().peek()).toBeUndefined();
  });

  it('should return undefined for pop() when the heap is empty', () => {
    expect(new Heap().pop()).toBeUndefined();
  });
});

describe('Max Heap', () => {
  it('should peek() the max item', () => {
    expect(new Heap(arr).peek()).toEqual(9);
  });

  it('should pop() the max item', () => {
    const heap = new Heap(arr);

    expect(heap.size()).toEqual(6);
    expect(heap.pop()).toEqual(9);
    expect(heap.size()).toEqual(5);
  });

  it('should pop() the max items until empty', () => {
    const heap = new Heap(arr);
    const res = [];

    while (heap.size()) { res.push(heap.pop()); }

    expect(heap.size()).toEqual(0);
    expect(res).toEqual([9, 8, 6, 5, 2, 1]);
  });

  it('should push() the given item', () => {
    const heap = new Heap(arr);

    heap.push(100);
    expect(heap.size()).toEqual(7);
    expect(heap.peek()).toEqual(100);
  });

  it('should push() all the given items', () => {
    const heap = new Heap(arr);

    heap.push(100, 101, 300, 5);
    expect(heap.size()).toEqual(10);
    expect(heap.peek()).toEqual(300);
  });

  it('should push() all the items in an array', () => {
    const heap = new Heap(arr);

    heap.push([100, 101, 300, 5]);
    expect(heap.size()).toEqual(10);
    expect(heap.peek()).toEqual(300);
  });
});

describe('Min Heap', () => {
  it('should peek() the min item', () => {
    expect(new Heap(arr, (a, b) => b - a).peek()).toEqual(1);
  });

  it('should pop() the min item', () => {
    const heap = new Heap(arr, (a, b) => b - a);

    expect(heap.size()).toEqual(6);
    expect(heap.pop()).toEqual(1);
    expect(heap.size()).toEqual(5);
  });

  it('should pop() the min items until empty', () => {
    const heap = new Heap(arr, (a, b) => b - a);
    const res = [];

    while (heap.size()) { res.push(heap.pop()); }

    expect(heap.size()).toEqual(0);
    expect(res).toEqual([1, 2, 5, 6, 8, 9]);
  });

  it('should push() the given item', () => {
    const heap = new Heap(arr, (a, b) => b - a);

    heap.push(-1);
    expect(heap.size()).toEqual(7);
    expect(heap.peek()).toEqual(-1);
  });

  it('should push() all the given items', () => {
    const heap = new Heap(arr, (a, b) => b - a);

    heap.push(100, 101, 300, -1);
    expect(heap.size()).toEqual(10);
    expect(heap.peek()).toEqual(-1);
  });

  it('should push() all the items in an array', () => {
    const heap = new Heap(arr, (a, b) => b - a);

    heap.push([100, 101, 300, -1]);
    expect(heap.size()).toEqual(10);
    expect(heap.peek()).toEqual(-1);
  });
});
