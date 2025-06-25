CREATE MIGRATION m12i6cvpn6ezxzyfrhdzfuadofjgdcf7kvqic7q4r2uwwy4bvco6oa
    ONTO m1eokh3y5dayib76pekpu4y2fdarczggf77jwooazv3hxocwfbxlra
{
  ALTER TYPE sys_user::SysTask {
      ALTER LINK codeRenderType {
          RENAME TO codeTaskType;
      };
  };
};
