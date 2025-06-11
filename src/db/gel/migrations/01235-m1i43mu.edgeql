CREATE MIGRATION m1i43murwhgegdl5kfojfhwvennezkyrfoh56fgrovyhkiirwx6xxa
    ONTO m17xuamq2h22gecs5437dprty2a5fae5esqdaprbyu75llr3fvubsq
{
  ALTER TYPE sys_core::SysCode {
      DROP CONSTRAINT std::exclusive ON ((.owner, .codeType, .name));
  };
  DROP TYPE sys_user::SysCodeType;
};
