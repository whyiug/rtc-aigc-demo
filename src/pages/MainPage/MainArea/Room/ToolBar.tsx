/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Drawer } from '@arco-design/web-react';
import { useDeviceState, useLeave } from '@/lib/useCommon';
import { RootState } from '@/store';
import { AI_MODEL } from '@/config';
import utils from '@/utils/utils';
import Menu from '../../Menu';

import style from './index.module.less';
import CameraOpenSVG from '@/assets/img/CameraOpen.svg';
import CameraCloseSVG from '@/assets/img/CameraClose.svg';
import MicOpenSVG from '@/assets/img/MicOpen.svg';
import SettingSVG from '@/assets/img/Setting.svg';
import MicCloseSVG from '@/assets/img/MicClose.svg';
import LeaveRoomSVG from '@/assets/img/LeaveRoom.svg';

function ToolBar(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  const room = useSelector((state: RootState) => state.room);
  const [open, setOpen] = useState(false);
  const model = room.aiConfig.Config.LLMConfig?.ModelName;
  const leaveRoom = useLeave();
  const { isAudioPublished, isVideoPublished, switchMic, switchCamera } = useDeviceState();
  const handleSetting = () => {
    setOpen(true);
  };
  return (
    <div className={`${className} ${style.btns} ${utils.isMobile() ? style.column : ''}`} {...rest}>
      {utils.isMobile() ? (
        <img src={SettingSVG} onClick={handleSetting} className={style.setting} alt="setting" />
      ) : null}
      <img
        src={isAudioPublished ? MicOpenSVG : MicCloseSVG}
        onClick={() => switchMic(true)}
        className={style.btn}
        alt="mic"
      />
      {model === AI_MODEL.VISION ? (
        <img
          src={isVideoPublished ? CameraOpenSVG : CameraCloseSVG}
          onClick={() => switchCamera(true)}
          className={style.btn}
          alt="camera"
        />
      ) : (
        ''
      )}
      <img src={LeaveRoomSVG} onClick={leaveRoom} className={style.btn} alt="leave" />
      {utils.isMobile() ? (
        <Drawer
          title="设置"
          visible={open}
          onCancel={() => setOpen(false)}
          style={{
            width: 'max-content',
          }}
        >
          <Menu />
        </Drawer>
      ) : null}
    </div>
  );
}
export default ToolBar;
