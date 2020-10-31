import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBalances, openDepositModal, openWithdrawModal } from '../../redux/actions/walletActions';

import { CssBaseline, Container,  } from '@material-ui/core';
import { DataGrid, ColDef, ColTypeDef, ValueFormatterParams } from '@material-ui/data-grid';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';

const WalletPage = ({
  getBalances,
  openDepositModal,
  openWithdrawModal,
  wallet
}: any) => {

  const icon: ColTypeDef = {
    type: 'string',
    renderCell: (params: ValueFormatterParams) =>  {  
      return <img height='30' src={`/assets/icons/${params.value}.png`} alt={`${params.value}`} />;
    }
  };
  const actions: ColTypeDef = {
    type: 'string',
    renderCell: (params: ValueFormatterParams) =>  { 
      return (
        <div>     
            <ArrowUpward onClick={function() { openWithdrawModal(params.data) }}/>
            <ArrowDownward onClick={function() { openDepositModal(params.data)}}/>
        </div>
      );
    }
  };
  const columns: ColDef[] = [
    { field: 'icon', headerName: ' ', width: 50, ...icon, },
    { field: 'symbol', headerName: 'Name', width: 80 },  
    { field: 'total', headerName: 'Total', width: 200 },  
    { field: 'available', headerName: 'Available', width: 200 },  
    { field: 'locked', headerName: 'Locked', width: 200 },  
    { field: 'btc_value', headerName: 'BTC Value', width: 200 },  
    { field: 'actions', headerName: 'Actions', width: 100, ...actions, },
  ];
  const rows = wallet.balances;

  useEffect(() => { getBalances(); }, [getBalances]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />          
        </div>
        <DepositModal />
        <WithdrawModal />
      </Container>
    </React.Fragment>    
  );
};

const mapStateToProps = (state: any) => ({
  wallet: state.wallet
});

export default connect(mapStateToProps, { getBalances, openDepositModal, openWithdrawModal })(WalletPage);
