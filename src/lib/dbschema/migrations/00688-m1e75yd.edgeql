CREATE MIGRATION m1e75yd2jt3ydtqeq7flitzpig24vkm7r643gbsupgi3pviplxtbzq
    ONTO m1p5an4ngfe2d5uq5ehvcnbhs77m4v4ftblq326h3t2ey65mlgpudq
{
  CREATE TYPE org_moed::MoedParticipant EXTENDING app_cm::CmClient {
      CREATE LINK office: sys_core::SysObj;
      CREATE PROPERTY consentDisclaimer: std::bool;
      CREATE PROPERTY ssn: std::str;
  };
};
