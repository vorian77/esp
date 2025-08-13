CREATE MIGRATION m1y3yack4xtcptinrcx46yu7stz6kwsv7rpjb3ajgymuas2szzfyma
    ONTO m1pl37rejsabftop2p4suhnlmslnfjezwtxpeuybwkbq4hbsry6hyq
{
  ALTER TYPE sys_core::ObjRoot {
      CREATE PROPERTY teststr: std::str;
  };
};
