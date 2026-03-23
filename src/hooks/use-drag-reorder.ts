import { useState, useCallback, DragEvent } from "react";

export function useDragReorder<T extends { id: string }>(
  items: T[],
  onReorder: (reordered: T[]) => void
) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDragStart = useCallback((index: number) => (e: DragEvent) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragOver = useCallback((index: number) => (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setOverIndex(index);
  }, []);

  const handleDrop = useCallback((index: number) => (e: DragEvent) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }
    const reordered = [...items];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);
    onReorder(reordered);
    setDragIndex(null);
    setOverIndex(null);
  }, [dragIndex, items, onReorder]);

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setOverIndex(null);
  }, []);

  return { dragIndex, overIndex, handleDragStart, handleDragOver, handleDrop, handleDragEnd };
}
