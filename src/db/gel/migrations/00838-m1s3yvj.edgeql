CREATE MIGRATION m1s3yvjigtmyzowugafzfk2fbxjs3sdtn4z2cyigzgyu76lcdr5hfa
    ONTO m15gmur4bfq6tj637bm5n2ke3g23ndwowtw6k6m5hogwixzss4cuqa
{
          ALTER TYPE sys_user::SysWidget {
      CREATE LINK codeWidgetType: sys_core::SysCode;
      CREATE LINK widgetObj: sys_core::SysObj;
  };
};
