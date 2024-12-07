import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { createGameFromApi } from "@/store/game.service";
import useWindowSize from "@/hooks/use-window-size.hook";
import { UseCreateMapProps } from "@/interfaces/use-create-maps.interface";

/**
 * Custom hook to create a map with specified dimensions.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.isOpen - Indicates if the modal is open.
 * @param {Function} props.onClose - Function to call when the modal is closed.
 *
 * @returns {Object} - An object containing the map dimensions, setters, and a submit handler.
 * @returns {number | null} width - The width of the map.
 * @returns {number | null} height - The height of the map.
 * @returns {Function} setWidth - Function to set the width of the map.
 * @returns {Function} setHeight - Function to set the height of the map.
 * @returns {Function} handleSubmit - Function to handle the submission of the map dimensions.
 */
const useCreateMap = ({ isOpen, onClose }: UseCreateMapProps) => {
  // Local state
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();

  // Update dimensions based on modal state and window size
  const { width: windowWidth } = useWindowSize();
  useEffect(() => {
    if (!isOpen) return;
    if (windowWidth <= 768) {
      setWidth(5);
      setHeight(10);
    } else {
      setWidth(10);
      setHeight(7);
    }
  }, [isOpen, windowWidth]);

  // Handle submission
  const handleSubmit = useCallback(() => {
    if (!width || !height || width < 1 || height < 1) {
      alert("The dimensions must be greater than or equal to 1.");
      return;
    }
    dispatch(createGameFromApi(width, height));
    onClose();
  }, [width, height, dispatch, onClose]);

  return {
    width,
    height,
    setWidth,
    setHeight,
    handleSubmit,
  };
};

export default useCreateMap;
