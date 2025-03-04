CREATE MIGRATION m1fmo6pms7r22dpfd2auxoaqdvwhhbzims4mpnj7a4pxzqgvl5xxxq
    ONTO m1s3yvjigtmyzowugafzfk2fbxjs3sdtn4z2cyigzgyu76lcdr5hfa
{
          ALTER TYPE sys_user::SysWidget {
      DROP LINK codeWidgetType;
      DROP LINK widgetObj;
  };
};
