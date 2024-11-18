CREATE MIGRATION m15zbsmeeurxknocxz4o7vglqzhxw4hpxsupwi2mdkoichvjli2iuq
    ONTO m1sht5m4wgnwp4mgaugea64uotn5g25r3esc7ivjta5wobzbzuxbna
{
  ALTER TYPE org_moed::MoedParticipant {
      CREATE LINK user: sys_user::SysUser;
  };
};
