import React, { useState, useEffect, useContext } from 'react'
import { ListGlobalContext } from './Context/context'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BsPlusCircleFill } from 'react-icons/bs'
import { AiFillCheckSquare } from "react-icons/ai"
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

function App() {


  const { state, dispatch } = useContext(ListGlobalContext)
  const [list, setList] = useState("")
  const [complete, setComplete] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editText, setEditText] = useState("")
  const [editIndex, setEditIndex] = useState(null)

  const Addlist = () => {
    const payload = {
      list,
      complete
    }
    if (list !== "") {
      dispatch({
        type: "NEW-LIST",
        payload: payload
      })
      setList("")
    }
  }

  const deleteLIst = (e) => {
    dispatch({
      type: "DELETE-LIST",
      payload: e
    })
  }

  const editList = (index, text) => {
    setEdit(true)
    setEditText(text)
    setEditIndex(index)
  }

  const editListText = () => {
    const payload = {
      index: editIndex,
      text: editText,
      complete: false
    };
    dispatch({
      type: "EDIT-LIST",
      payload: payload
    });

    setEdit(false);
    setEditText("");
  };

  const toDoComplete = (index) => {
    dispatch({
      type: "COMPLETE-LIST",
      payload: {
        index: index,
        complete: true
      }
    });
  };



  return (
    <div>


      <div className="container">
        <div className="main p-3">
          <h1 className='App-name mb-2 mx-2'> TO DO LIST</h1>
          {
            !edit ? (
              <div className="custom-input d-flex mb-5">
                <input type="text"
                  placeholder='New List...'
                  required
                  value={list}
                  onChange={(e) => { setList(e.target.value) }}
                />
                <BsPlusCircleFill
                  onClick={() => { Addlist() }}
                  className='add-btn'

                />
              </div>
            ) : (
              <div className="custom-input d-flex mb-5">
                <input type="text"
                  required
                  value={editText}
                  onChange={(e) => { setEditText(e.target.value) }}
                />
                <BiEdit
                  onClick={() => { editListText() }} className='add-btn'

                />
              </div>
            )
          }



          <div className="p-1 border">
            {
              state.list.map((data, index) => (
                <div className="card shadow mb-2" key={index}>
                  <div className="card-body d-flex">
                    <h5 className={data.complete ? ("text-title text-decoration-line-through") : ("text-title")}>{data.list}</h5>
                    <div className="ms-auto">

                      <AiFillCheckSquare className='ms-2 complete' onClick={() => { toDoComplete(index) }} />

                      <BiEdit className='ms-2 edit' onClick={() => { editList(index, data.list) }} />

                      <AiFillDelete className='ms-2 delete' onClick={() => { deleteLIst(index) }} />
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

