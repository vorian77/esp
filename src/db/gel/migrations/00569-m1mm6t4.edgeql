CREATE MIGRATION m1mm6t4uircswmz5tr3rvdy4wcewhrz3rpjkqxxuyfarhjd6rnnefq
    ONTO m1q537ds4itbsdb5u4t7puaijpqjn7jne7ns3co5lnesf2ejeufwzq
{
              ALTER TYPE sys_user::SysUserPrefType {
      CREATE REQUIRED PROPERTY isActive: std::bool {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
