CREATE MIGRATION m1kzdccesxj64abvy6nhibjndsfv2b6knkhsagaay66py7othfsl3q
    ONTO m1u7ebzxidbkbx2wmpx5d2j5ut4a2ttsyj5ighk3u2p7ta7jnbiglq
{
              ALTER FUNCTION sys_user::getRootUser() USING (SELECT
      sys_user::SysUser
  FILTER
      (.userName = '*ROOTUSER*')
  );
};
