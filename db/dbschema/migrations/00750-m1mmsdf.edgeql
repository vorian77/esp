CREATE MIGRATION m1mmsdfhgwzmy52y3yaqkygnh2ukkv27sj2pasdk2phjscrgpn5t4a
    ONTO m1mlhfdb7pc4zttwkq3moqbs57yukertrpdap35x5rsi3532h4c7jq
{
  ALTER TYPE sys_core::SysOrg {
      CREATE PROPERTY logoWidth: std::int16;
  };
};
