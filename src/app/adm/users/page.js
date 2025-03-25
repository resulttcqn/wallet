'use client';

import { useEffect, useState } from 'react';
import supabase from '../../../Lib/supabase';

import { RiEdit2Line, RiDeleteBin6Fill, RiSaveFill } from "react-icons/ri";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  

  const [action, setAction] = useState('');
  const [targetUserId, setTargetUserId] = useState(null);

  useEffect(() => { 

    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, phone, role, approved, balance');

      if (error) {
        console.error(error);
      } else {
        setUsers(data);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  // 수정된 사용자 데이터 상태 변경
  const handleRoleChange = (event) => {
    setEditedUserData({
      ...editedUserData,
      role: event.target.value, // 선택된 값으로 role 업데이트
    });
  };
  
  const handleApprovedChange = (event) => {
    setEditedUserData({
      ...editedUserData,
      approved: event.target.value === "true", // true/false로 변환
    });
  };

  const handleEditClick = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find(user => user.id === userId);
    setEditedUserData(userToEdit); // 수정하려는 사용자의 데이터를 상태에 설정
  };

  const handleInputChange = (e) => {
    setEditedUserData({ ...editedUserData, [e.target.name]: e.target.value });
  };


  const handleConfirm = async (actionType, userId = null) => {
    setIsModalOpen(true);
    setAction(actionType);

    setTargetUserId(userId);

    if (actionType === 'save') {
        setModalMessage('변경된 정보를 저장하시겠습니까?');
    } else if (actionType === 'delete') {
        setModalMessage('사용자를 삭제하시겠습니까?');
    }
  }

  const handleConfirmAction = async () => {
    if (action === 'save') {

      const today = new Date().toISOString().split('T')[0];

      const { error } = await supabase
        .from('profiles')
        .update({
          ...editedUserData, // 기존 데이터
          input_dt: today // 오늘 날짜 추가
        })
        .eq('id', editingUserId);

      if (error) {
        console.error(error);
      } else {
        setUsers(users.map((user) => (user.id === editingUserId ? editedUserData : user)));
        setEditingUserId(null);
        setIsModalOpen(false)
        toast.success("사용자 정보가 업데이트되었습니다.");

      }
    } else if (action === 'delete') {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', targetUserId);

      if (error) {
        console.error(error);
      } else {
        setUsers(users.filter((user) => user.id !== targetUserId));
        setIsModalOpen(false)
        toast.success("사용자 정보가 삭제되었습니다.");

      }
    }
  }


  if (loading) {
    return (
        <div role="status" className='fixed flex justify-center items-center top-0 right-0 left-0 z-50 min-h-screen '>
            <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
  }

  return (
    <>

        <ToastContainer position="top-right" autoClose={3000} />
        { isModalOpen &&
            <div id="popup-modal" tabIndex="-1" className="fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <button onClick={() => setIsModalOpen(!isModalOpen)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg text-white font-normal text-gray-500 dark:text-gray-400">{modalMessage}</h3>
                            <button onClick={handleConfirmAction} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                확인
                            </button>
                            <button onClick={() => setIsModalOpen(!isModalOpen)} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">닫기</button>
                        </div>
                    </div>
                </div>
            </div>
        }
        

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className='text-white font-bold m-4 text-xl'>사용자 관리</div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 text-center">사용자 고유 식별 ID</th>
                <th scope="col" className="px-6 py-3 text-center">회원 ID</th>
                <th scope="col" className="px-6 py-3 text-center">연락처</th>
                <th scope="col" className="px-6 py-3 text-center">권한여부</th>
                <th scope="col" className="px-6 py-3 text-center">승인여부</th>
                <th scope="col" className="px-6 py-3 text-center">리플(개수)</th>
                <th scope="col" className="px-6 py-3 text-center">작업</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id} className="text-gray-100 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 ">
                <th scope="row" className="px-6 py-4 font-medium text-center text-gray-300 whitespace-nowrap">
                    {user.id}
                </th>
                <td className="px-6 py-4  text-center">
                    {user.username}
                </td>
                <td className="px-6 py-4  text-center">
                    {editingUserId === user.id ? (
                    <input
                        type="text"
                        name="phone"
                        value={editedUserData.phone}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    ) : (
                    user.phone
                    )}
                </td>
                <td className="px-6 py-4 text-center">
                    {editingUserId === user.id ? (
                    <select 
                        id="role" 
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={editedUserData.role} // 상태에서 관리되는 역할 값
                        onChange={handleRoleChange} // 값 변경시 상태 업데이트
                    >
                        <option value="" disabled>권한 선택</option>
                        <option value="user">사용자</option>
                        <option value="admin">관리자</option>
                    </select>
                    ) : (
                    user.role === 'user' ? "사용자" : "관리자"
                    )}
                </td>
                <td className="px-6 py-4  text-center">
                    {editingUserId === user.id ? (
                    <select 
                        id="approved" 
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={editedUserData.approved ? "true" : "false"} // 상태에서 관리되는 승인 여부 값
                        onChange={handleApprovedChange} // 값 변경시 상태 업데이트
                    >
                        <option value="" disabled>승인 여부</option>
                        <option value="true">승인</option>
                        <option value="false">거부</option>
                    </select>
                    ) : (
                    user.approved ? "승인" : "미승인"
                    )}
                </td>
                <td className="px-6 py-4  text-center">
                    {editingUserId === user.id ? (
                    <input
                        type="number"
                        name="balance"
                        value={editedUserData.balance}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    ) : (
                    user.balance
                    )}
                </td>
                
                <td className="px-6 py-4">
                    {editingUserId === user.id ? (
                        <div className='flex justify-center items-center'>
                            <button
                                onClick={() => handleConfirm('save')}
                                className="font-medium text-lg mr-2 cursor-pointer flex items-center hover:text-green-500"
                            >
                                <RiSaveFill />
                                <span className='ml-2'>저장</span>
                            </button>
                        </div>
                        
                    ) : (
                    <div className='flex justify-center items-center'>
                        <button
                            onClick={() => handleEditClick(user.id)}
                            className="font-medium text-lg mr-2 cursor-pointer flex items-center hover:text-blue-500"
                        >
                            <RiEdit2Line/>
                            <span className='ml-2'>수정</span>
                        </button>
                        <button
                            onClick={() => handleConfirm('delete', user.id)}
                            className="font-medium text-lg mr-2 cursor-pointer flex items-center hover:text-red-500"
                            >
                            <RiDeleteBin6Fill />
                            <span className='ml-2'>삭제</span>
                        </button>
                    </div>
                    
                    )}

                    
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </>
    
  );
}
