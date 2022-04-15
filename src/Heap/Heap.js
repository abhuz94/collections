import { defaultComparator, swap } from './Heap.utils';
import { PROTECTED_PROPERTY_PROPS, store } from './Heap.constants';

class Heap {
  constructor(arr = [], comparator = defaultComparator) {
    if (!Array.isArray(arr)) { throw new TypeError('"arr" must be an array'); }

    store.set(this, { heap: [], comparator, size: 0 });
    this.push(arr);
  }

  pop() {
    const { heap, size } = store.get(this);

    if (size === 0) { return undefined; }

    swap(0, size - 1, heap);

    const item = heap.pop();

    this.sink(0);
    store.set(this, { ...store.get(this), size: heap.length });

    return item;
  }

  push(...items) {
    items.forEach((item) => {
      if (Array.isArray(item)) {
        this.push(...item);
      } else { this.pushHelper(item); }
    });

    return this;
  }

  peek() { return store.get(this).heap[0]; }

  size() { return store.get(this).size; }

  toArray() { return [...store.get(this).heap]; }
}

// protected helper functions

Object.defineProperties(Heap.prototype, {
  pushHelper: {
    value(item) {
      const { heap, size } = store.get(this);

      heap.push(item);
      this.swim(size);
      store.set(this, { ...store.get(this), heap, size: heap.length });

      return this;
    },
    ...PROTECTED_PROPERTY_PROPS,
  },
  swim: {
    value(i = 0) {
      const { heap, comparator } = store.get(this);
      let parentIndex = (i - 1) >> 1;
      let currIndex = i;

      while (currIndex > 0 && comparator(heap[parentIndex], heap[currIndex]) < 0) {
        swap(parentIndex, currIndex, heap);

        currIndex = parentIndex;
        parentIndex = (currIndex - 1) >> 1;
      }

      return this;
    },
    ...PROTECTED_PROPERTY_PROPS,
  },
  sink: {
    value(i = 0) {
      const { heap, size, comparator } = store.get(this);
      const getLargestChildIndex = (leftChildIndex, rightChildIndex) => {
        if (comparator(heap[leftChildIndex], heap[rightChildIndex]) < 0) {
          return rightChildIndex;
        }

        return leftChildIndex;
      };
      let currIndex = i;
      let largestChildIndex = getLargestChildIndex(2 * i + 1, 2 * i + 2);

      while (largestChildIndex < size && comparator(heap[currIndex], heap[largestChildIndex]) < 0) {
        swap(largestChildIndex, currIndex, heap);

        currIndex = largestChildIndex;
        largestChildIndex = getLargestChildIndex(2 * currIndex + 1, 2 * currIndex + 2);
      }

      return this;
    },
    ...PROTECTED_PROPERTY_PROPS,
  },
});

export default Heap;
