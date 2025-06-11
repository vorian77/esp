CREATE MIGRATION m1kog5l4i5wpl2h5w3okbpfnkfrmdo2evnjw57k3kutq7ehafrpxrq
    ONTO m1wgy2foxxoht6ou6ydempczfmllv34zhhvuxsthjor4xyknmezlfq
{
  ALTER TYPE sys_core::SysObj {
      DROP CONSTRAINT std::exclusive ON ((.owner, .name));
  };
};
