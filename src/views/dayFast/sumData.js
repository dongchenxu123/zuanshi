function loadDataNum (response) {
        var Charge = 0
        var Click = 0
        var Ctr = 0
        var Ecpc = 0
        var Ecpm = 0
        var Pv = 0
        var rptTotal = []
        var rpt = response.data.rpt
        var AlipayAmt = 0
        var AlipayNum = 0
        var CartNum = 0
        var FavItem = 0
        var FavShop = 0
        var Roi = 0
        if(response.data.err || response.data.length <=0 || rpt.length <=0) {
            rptTotal = []
        }
        if(rpt && rpt.length > 0) {
            // firstlogDate = rpt[rpt.length-1].LogDate
            for(var i=0; i<rpt.length; i++) {
                if (rpt[i].Charge) {
                  Charge += rpt[i].Charge
                }
                if (rpt[i].Click) {
                  Click += rpt[i].Click
                }
                if (rpt[i].Pv) {
                  Pv += rpt[i].Pv
                }
                if(rpt[i].AlipayAmt) {
                   AlipayAmt +=  rpt[i].AlipayAmt
                }
                if (rpt[i].AlipayNum) {
                   AlipayNum += rpt[i].AlipayNum
                }
                if (rpt[i].CartNum) {
                    CartNum += rpt[i].CartNum
                }
                if (rpt[i].FavItem) {
                    FavItem += rpt[i].FavItem
                }
                if (rpt[i].FavShop) {
                    FavShop += rpt[i].FavShop
                }
             }
            if(Pv > 0) {
                Ctr = Click/Pv
                Ecpm = Charge*1000/Pv
            }
            if (Click > 0) {
               Ecpc =  Charge/Click
            }
            if (Charge > 0) {
                Roi = AlipayAmt/Charge
            }
            var obj ={
                Charge: Charge,
                Click: Click,
                Ctr: Ctr,
                Ecpc: Ecpc,
                Ecpm: Ecpm,
                Pv: Pv,
                AlipayAmt: AlipayAmt,
                AlipayNum: AlipayNum,
                CartNum: CartNum,
                FavItem: FavItem,
                FavShop: FavShop,
                Roi: Roi
            }
            rptTotal.push(obj)
        }
        var rptTotalData = rpt
        if (rptTotalData && rptTotalData.length > 0) {
           for(var j=0; j<rptTotalData.length; j++) {
               rptTotalData[j].Charge = rptTotalData[j].Charge
               if (rptTotalData[j].Pv > 0) {
                   rptTotalData[j].Ctr = (rptTotalData[j].Click/rptTotalData[j].Pv).toFixed(2)
               }
               if (rptTotalData[j].Ecpc && rptTotalData[j].Click > 0) {
                   rptTotalData[j].Ecpc = (rptTotalData[j].Charge/rptTotalData[j].Click).toFixed(2)
               }
               if (rptTotalData[j].Ecpm && rptTotalData[j].Pv > 0) {
                   rptTotalData[j].Ecpm = (rptTotalData[j].Charge*1000/rptTotalData[j].Pv).toFixed(2)
               }
               if (rptTotalData[j].Roi && rptTotalData[j].Charge > 0 && rptTotalData[j].AlipayAmt) {
                   rptTotalData[j].Roi = (rptTotalData[j].AlipayAmt/rptTotalData[j].Charge).toFixed(2)
               }
               if (rptTotalData[j].Cvr && rptTotalData[j].Click > 0 && rptTotalData[j].AlipayNum) {
                   rptTotalData[j].Cvr = (rptTotalData[j].AlipayNum/rptTotalData[j].Click).toFixed(2)
               }
           } 
        }
        var obj={
            campaginData: rptTotal,
            rptData: rptTotalData
        }
        return obj 

    }

    export default loadDataNum