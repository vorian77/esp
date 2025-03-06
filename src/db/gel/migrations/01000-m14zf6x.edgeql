CREATE MIGRATION m14zf6xb7mm5rdozdyqwc7kywheopdukugrzazsdnh6pb6bl4vzgdq
    ONTO m1x5he6wxqzv4ehfphevpe6tmzwdxyft4qiywiosx66mxlcjwqhgsq
{
  DROP FUNCTION sys_user::getWidget(widgetName: std::str);
  DROP TYPE sys_user::SysWidget;
};
