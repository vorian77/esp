CREATE MIGRATION m1ge6xlquxsck3fomhdo45zbijwaa3wwq3svpcclmlngo5pgc2v3ja
    ONTO m1ou2yp5aezw6dmakerffcxedcb6wa376thtpoaralbloezhwk6jjq
{
  ALTER TYPE sys_core::SysDataObjActionConfirm {
      DROP CONSTRAINT std::exclusive ON (.codeActionShow);
  };
  ALTER TYPE sys_core::SysDataObjActionShow {
      DROP CONSTRAINT std::exclusive ON (.codeActionShow);
  };
};
