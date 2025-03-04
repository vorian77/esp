CREATE MIGRATION m1wkm5wit7dwif7nmjn5xpofvc72hzxrp33aevusumbexo6hoifvda
    ONTO m13w5zkwdvfh7syq67xc6yhxntamvd6cxmqq5tfyjetxgisghwstga
{
                              ALTER TYPE sys_core::SysDataObjActionFieldGroupItem {
      DROP CONSTRAINT std::exclusive ON (.action);
  };
};
