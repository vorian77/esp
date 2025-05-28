CREATE MIGRATION m1tis3m2abj52i2bb7h3s57avcky5gjpkjrrxie22ho742z2enptbq
    ONTO m1osprs5satohmjtgbypff3ql7zfcpspk5puft5l63764xttyddpya
{
  ALTER TYPE sys_user::SysUserActionShow {
      DROP PROPERTY exprWith;
  };
};
