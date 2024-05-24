import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setLists,
  setTotalPages,
  setCurrentPages,
} from "../../utils/ListSlice";

const useFetchList = () => {
  const token = useSelector((state) => state.auth.isToken);
  const dispatch = useDispatch();
  const currentPages = useSelector((state) => state.list.currentPages);
  const lists = useSelector((state) => state.list.lists);

  const fetchLists = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/list/lists?page=${page}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const { totalPages, currentPage, lists } = response.data;
      const parsedCurrentPage = parseInt(currentPage);
      dispatch(setLists(lists));
      dispatch(setCurrentPages(parsedCurrentPage));
      dispatch(setTotalPages(totalPages));
    } catch (error) {
      console.error("Error fetching todo-list:", error);
    }
  };

  const handlePrevPage = () => {
    dispatch(setCurrentPages(currentPages - 1));
  };

  const handleNextPage = () => {
    dispatch(setCurrentPages(currentPages + 1));
  };

  const handleDeleteList = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/list/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      fetchLists(currentPages);
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  if (lists.length === 0 && currentPages > 1) {
    dispatch(setCurrentPages(currentPages - 1));
  }

  useEffect(() => {
    fetchLists(currentPages);
  }, [currentPages]);

  return {
    fetchLists,
    handlePrevPage,
    handleNextPage,
    handleDeleteList,
  };
};

export default useFetchList;
