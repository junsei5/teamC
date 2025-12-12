'use client'; 

import Image from 'next/image'; 
import React, { useState } from 'react'; 
import { useRouter } from "next/navigation";

const PROFILE_IMAGE_SRC = "/images/maru.png"; 

export default function ProfilePage() {
  const router = useRouter();
  
  const [nickname, setNickname] = useState(''); 
  const [regularRoute, setRegularRoute] = useState({
    startStation: '',
    endStation: '',
  });
  const [isEditing, setIsEditing] = useState(false); 
  const [activeTab, setActiveTab] = useState<'profile' | 'friends' | 'groups'>('profile');

  const toggleEditing = () => { setIsEditing(prev => !prev); };
  const handleTabChange = (tab: 'profile' | 'friends' | 'groups') => { setActiveTab(tab); };
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => { setNickname(event.target.value); };
  const handleRouteChange = (field: 'startStation' | 'endStation', value: string) => {
    setRegularRoute(prev => ({ ...prev, [field]: value, }));
  };

  //矢印でdashboardに戻る
  const handleGoBack = () => {
    router.push("../dashboard");
  };

  const displayRoute = (
    regularRoute.startStation || regularRoute.endStation
      ? `${regularRoute.startStation || '---'} - ${regularRoute.endStation || '---'}`
      : '未設定'
  );

  return (
    <div style={{
      position: 'relative', minHeight: '100vh', backgroundColor: '#f0f0ff',
      backgroundImage: 'linear-gradient(135deg, #a8dadc, #457b9d, #1d3557)',
      overflow: 'hidden', 
      paddingTop: '100px', 
    }}>
      
      {/* ... ヘッダーエリア (省略) ... */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: '24px', cursor: 'pointer', width: '30px' }}>&larr;</div>
      </div>
      <div
        style={{ fontSize:"24px", cursor:"pointer", width:"30px" }}
        onClick={handleGoBack}
      ></div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* 4. 画像を配置するコンテナ */}
        <div style={{ 
          position: 'relative', width: '120px', height: '120px', zIndex: 10,
          // 🌟 修正1: 重なりをなくすため marginBottom を 0 に設定 🌟
          marginBottom: '0px', 
          backgroundColor: 'white', borderRadius: '50%',
        }}>
          <Image 
            src={PROFILE_IMAGE_SRC} alt="プロフィール画像" width={120} height={120} 
            style={{ borderRadius: '50%', border: '4px solid white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
          />
        </div>

        {/* 2. タブナビゲーションエリア */}
        <div style={{
          display: 'flex', width: '90%', maxWidth: '400px', justifyContent: 'space-around',
          // 🌟 修正2: 円とタブの間にスペースを設けるため margin-top を大きくする 🌟
          margin: '80px 0 10px 0', 
        }}>
          {['profile', 'friends', 'groups'].map((tabKey) => {
            const tabName = tabKey === 'profile' ? 'プロフィール' : tabKey === 'friends' ? '友達' : 'グループ';
            const isActive = activeTab === tabKey;
            
            return (
              <div
                key={tabKey}
                onClick={() => handleTabChange(tabKey as 'profile' | 'friends' | 'groups')}
                style={{
                  cursor: 'pointer', padding: '10px 15px', fontWeight: isActive ? 'bold' : 'normal',
                  color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  borderBottom: isActive ? '3px solid white' : '3px solid transparent',
                  transition: 'all 0.2s', fontSize: '16px',
                }}
              >
                {tabName}
              </div>
            );
          })}
        </div>


        {/* 4. 条件付きレンダリング: プロフィールタブが選択されている場合のみ表示 */}
        {activeTab === 'profile' && (
            <div style={{
              width: '90%', maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(5px)', borderRadius: '15px', padding: '20px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}>
              
              {/* ニックネームなどの情報表示エリア */}
              <div style={{ 
                display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
                // 🌟 修正3: 円が重ならないため marginTop を 0 に戻す 🌟
                marginTop: '0px', 
                borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '15px',
              }}>
                <p style={{ margin: 0, fontSize: '20px', color: '#333' }}>{nickname || 'ニックネーム未設定'}</p>
              </div>

              {/* ... その他の情報と編集フォーム (省略) ... */}
              <p style={{ margin: '5px 0' }}>最寄り駅: 0</p>
              <p style={{ margin: '5px 0' }}>定期: {displayRoute}</p>

              <div style={{ 
                backgroundColor: 'white', borderRadius: '10px', padding: '15px', marginTop: '20px',
              }}>
                <div onClick={toggleEditing} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isEditing ? '10px' : '0', }}>
                    <h3 style={{ margin: 0 }}>プロフィール編集</h3>
                    <span style={{ fontSize: '20px' }}>{isEditing ? '▲' : '▼'}</span>
                </div>
                
                {isEditing && (
                  <div style={{ paddingTop: '10px', borderTop: '1px solid #eee' }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>ニックネーム</h4>
                    <input type="text" value={nickname} onChange={handleNicknameChange} placeholder="新しいニックネームを入力" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid black', marginBottom: '15px', boxSizing: 'border-box' }} />
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>定期区間</h4>
                    <input type="text" value={regularRoute.startStation} onChange={(e) => handleRouteChange('startStation', e.target.value)} placeholder="出発駅を入力" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid black', marginBottom: '10px', boxSizing: 'border-box' }} />
                    <input type="text" value={regularRoute.endStation} onChange={(e) => handleRouteChange('endStation', e.target.value)} placeholder="到着駅を入力" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid black', boxSizing: 'border-box' }} />
                  </div>
                )}
              </div>
            </div>
        )}

        {/* ... その他のタブのコンテンツ（仮） (省略) ... */}
        {activeTab !== 'profile' && (
            <div style={{
                width: '90%', maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(5px)', borderRadius: '15px', padding: '40px 20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', textAlign: 'center', marginTop: '10px',
            }}>
                <p style={{ margin: 0 }}>{activeTab === 'friends' ? '友達' : 'グループ'}のコンテンツがここに表示されます。</p>
            </div>
        )}

      </div>
    </div>
  );
}