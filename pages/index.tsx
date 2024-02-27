import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useUserStore from '@/stores/useUserStore';
import useAMessage from '@/atoms/AMessage/AMessage';
import { Button } from 'antd';
import groupApi from '@/api/groupApi';
import useGroupStore from '@/stores/useGroupStore';
import axios, { Axios } from 'axios';
import useConfirmModal from '@/hooks/useConfirmModal';
import Terms from '@/atoms/Terms/Terms';

export default function Home() {
  const { contextHolder, axiosError } = useAMessage();
  const { user, setUser } = useUserStore();
  const { modal, showModal, hideModal } = useConfirmModal({
    title: '약관 동의',
    component: <Terms />,
    onOk: () => {
      console.log('ok');
    },
    onCancel: () => {
      console.log('cancel');
    },
  });

  return (
    <main>
      <Button
        onClick={() => {
          // groupApi
          //   .getAllGroups()
          //   .then((res) => {
          //     console.log(res);
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
          try {
            const refreshToken = document.cookie
              .split(';')
              .find((cookie) => cookie.includes('refreshToken'))
              ?.split('=')[1];
            console.log(refreshToken);

            axios
              .post('/v3/jwt/reissue', {
                Headers: { Authorization: `Bearer ${refreshToken}` },
              })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          } catch (err) {
            console.log(err);
          }
        }}
      >
        test
      </Button>
      <Button
        onClick={() => {
          console.log('click');
          showModal();
        }}
      >
        test
      </Button>
      {contextHolder}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <div className='font-bold text-h1 text-primary-0'>
          다람쥐 헌 쳇바퀴 lorem ipsum
        </div>
        <div className='font-bold text-h2 text-primary-1'>
          다람쥐 헌 쳇바퀴 lorem ipsum
        </div>
        <div className='font-bold text-h3 text-primary-2'>
          다람쥐 헌 쳇바퀴 lorem ipsum
        </div>
        <div className='font-bold text-h4 text-secondary-0'>
          다람쥐 헌 쳇바퀴 lorem ipsum
        </div>
        <div className='font-bold text-h5 text-secondary-1'>
          다람쥐 헌 쳇바퀴 lorem ipsum
        </div>
        <div className='font-bold text-h6 text-secondary-2'>
          다람쥐 헌 쳇바퀴 lorem ipsum
        </div>
        <div className='text-b1 text-grey-0'>다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className='text-b2 text-grey-1'>다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className='text-b3 text-grey-2'>다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className='text-b4 text-grey-3'>다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className='text-b5 text-red'>다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className='text-b6 text-green'>다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className='font-light text-l1'>다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className='font-light text-l2'>다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className='font-light text-l3'>다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className='font-light text-l4'>다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className='font-light text-l5'>다람쥐 헌 쳇바퀴 lorem ipsum</div>
      </div>
      {modal}
    </main>
  );
}
