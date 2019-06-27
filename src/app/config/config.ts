export  const Config = {
  baseURI: '',
  operations: {
    property: {
      get:{
        data: '/api/secured/Item/Section/In/Select'
      }
    }
  },
  itemTypes: {
    get: {
        types:'/api/secured/ItemType/Select'
    }
  },
  itemStatus: {
    get: {
        types:'/api/secured/ItemStatus/Select'
    }
  },
  transfer:{
    post:{
        transfer: '/api/secured/Item/Stock/Transfer'

    },
    get:{

    }
  },
  List: {
      get:{
        itemFilterByName: '/api/secured/Item/Filter/ByName',
        MeasureUnit: '/api/secured/MeasureUnit/List',
        barcode: '/api/secured/List/BarCode/Select',
        ItemGroup: '/rs/api/secured/ItemGroup/Select',
        marker: '/api/secured/List/Maker/Filter',
        supplier: '/api/secured/List/Supplier/Filter',
        model: '/api/secured/List/Model/Filter',
        stock:'/api/secured/stock/Select'
      },
      post:{
        lastBarCode: '/api/secured/List/BarCode/Get/LastCode',
        marker:'/api/secured/List/Maker/Insert',
        supplier:'/api/secured/List/Supplier/Insert',
        model:'/api/secured/List/Model/Insert',
        freeCodes: '/api/secured/List/BarCode/Get/FreeCodes',
        property: '/api/secured/Staff/Filter/ByStock',
        staff: '/api/secured/Staff/Filter/ByName/V2',
        stock: '/api/secured/Item/Stock/Change',
        addon: '/api/secured/Item/Addon',
        invoice: '/api/secured/Item/Stock/Change'
      }
  },
  inventory:{
    post:{
      insert: "/api/secured/Item/Insert"
    }
  },
  cart:{
    post:{
      put:"/api/secured/internal/session/put",
      getAll: "/api/secured/internal/session/getAll",
      remove: "/api/secured/internal/session/remove",
      clear: "/api/secured/internal/session/clear",
    }
  },
  massage: {
    get: {
      list: '/api/secured/Item/Inbox/Select',
      selectedList: '/api/secured/Item/Inbox/Detail/Select'
    },
    post: {
      NotApprove: '/api/secured/Item/Inbox/NotApprove',
      Approve: '/api/secured/Item/Inbox/Approve'
    }
  }

};
