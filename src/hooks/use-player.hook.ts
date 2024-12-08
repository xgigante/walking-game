import { useState, useCallback, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setActivePlayer } from "@/store/game-slice";
import { AppDispatch, RootState } from "@/store";
import { PlayerScenario } from "@/interfaces/player.interface";
import { Player } from "@/interfaces/player.interface";

/**
 * Custom hook to manage player-related state and actions.
 *
 * @param {Player} player - The player object.
 * @param {PlayerScenario} scenario - The scenario in which the player is involved.
 * @param {() => void} [onClick] - Optional callback function to be called on player click.
 *
 * @returns {object} An object containing state, actions, and computed properties.
 * @returns {object.state} state - The local and derived state.
 * @returns {boolean} state.isModalOpen - Indicates if the modal is open.
 * @returns {boolean} state.isSelected - Indicates if the player is selected.
 * @returns {boolean} state.isFooter - Indicates if the player is in the footer scenario.
 * @returns {boolean} state.isTable - Indicates if the player is in the table scenario.
 * @returns {boolean} state.isDisabled - Indicates if the player is disabled.
 * @returns {object.actions} actions - The actions to manipulate the state.
 * @returns {function} actions.handlePlayerClick - Function to handle player click.
 * @returns {function} actions.toggleModal - Function to toggle the modal state.
 * @returns {function} actions.closeModal - Function to close the modal.
 * @returns {object.computed} computed - The computed properties.
 * @returns {Player[]} computed.players - The list of players from the Redux state.
 */
export const usePlayer = (
  player: Player,
  scenario: PlayerScenario,
  onClick?: () => void
) => {
  // Redux state
  const dispatch = useDispatch<AppDispatch>();
  const { activePlayer, players } = useSelector(
    (state: RootState) => ({
      activePlayer: state.game.activePlayer,
      players: state.game.players,
    }),
    shallowEqual
  );

  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized
  const isSelected = useMemo(
    () => activePlayer === player.username,
    [activePlayer, player.username]
  );

  const isFooter = scenario === PlayerScenario.InFooter;
  const isTable = scenario === PlayerScenario.InTable;

  const isDisabled = useMemo(() => {
    const alreadySelected = players.some((p) => p.username === player.username);
    return !isTable && !isFooter && alreadySelected;
  }, [isTable, isFooter, players, player.username]);

  // Handler
  const handlePlayerClick = useCallback(() => {
    if (isFooter) return;
    dispatch(setActivePlayer(player.username));
    onClick?.();
  }, [isFooter, player.username, dispatch, onClick]);

  const toggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return {
    state: {
      isModalOpen,
      isSelected,
      isFooter,
      isTable,
      isDisabled,
    },
    actions: {
      handlePlayerClick,
      toggleModal,
      closeModal,
    },
    computed: {
      players,
    },
  };
};
