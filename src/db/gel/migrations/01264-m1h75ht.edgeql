CREATE MIGRATION m1h75ht6rtwmpsf73duk6iiu6wbs32pmad2dyxnibzhre6csku7fuq
    ONTO m12i6cvpn6ezxzyfrhdzfuadofjgdcf7kvqic7q4r2uwwy4bvco6oa
{
  ALTER TYPE sys_user::SysTask {
      ALTER LINK codeTaskType {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
};
