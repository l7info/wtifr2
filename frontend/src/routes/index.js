import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useRef } from "react";

import LoggedInLayout from "../layout";
import Dashboard from "../pages/Dashboard/";
import TicketResponsiveContainer from "../pages/TicketResponsiveContainer";
import Signup from "../pages/Signup/";
import Login from "../pages/Login/";
import Connections from "../pages/Connections/";
import SettingsCustom from "../pages/SettingsCustom/";
import Relatorios from "../pages/Relatórios";
import Financeiro from "../pages/Financeiro/";
import Users from "../pages/Users";
import Contacts from "../pages/Contacts/";
import Queues from "../pages/Queues/";
import Tags from "../pages/Tags/";
import MessagesAPI from "../pages/MessagesAPI/";
import Helps from "../pages/Helps/";
import ContactLists from "../pages/ContactLists/";
import ContactListItems from "../pages/ContactListItems/";
import { ForwardMessageProvider } from "../context/ForwarMessage/ForwardMessageContext";
import { AuthProvider } from "../context/Auth/AuthContext";
import { TicketsContextProvider } from "../context/Tickets/TicketsContext";
import { WhatsAppsProvider } from "../context/WhatsApp/WhatsAppsContext";
import Route from "./Route";
import Schedules from "../pages/Schedules";
import Campaigns from "../pages/Campaigns";
import CampaignsConfig from "../pages/CampaignsConfig";
import CampaignReport from "../pages/CampaignReport";
import Annoucements from "../pages/Annoucements";
import Chat from "../pages/Chat";
import ToDoList from "../pages/ToDoList/";
import Subscription from "../pages/Subscription/";
import Files from "../pages/Files/";
import Prompts from "../pages/Prompts";
import QueueIntegration from "../pages/QueueIntegration";
import LogLauncher from "../pages/LogLauncher";

import ForgetPassword from "../pages/ForgetPassWord/"; // Reset PassWd

const Routes = () => {
  const [showCampaigns, setShowCampaigns] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Verifica se está em um iframe
    if (window.self !== window.top) {
      // Se estiver em um iframe, ajusta o tamanho automaticamente
      const resizeIframe = () => {
        if (iframeRef.current) {
          iframeRef.current.style.height = document.documentElement.scrollHeight + 'px';
        }
        // Informa ao pai o novo tamanho
        window.parent.postMessage({
          type: 'iframeResize',
          height: document.documentElement.scrollHeight
        }, '*');
      };

      window.addEventListener('resize', resizeIframe);
      resizeIframe();

      // Informa ao pai que o conteúdo foi carregado
      window.parent.postMessage({ type: 'iframeLoaded' }, '*');

      return () => {
        window.removeEventListener('resize', resizeIframe);
      };
    }

    const cshow = localStorage.getItem("cshow");
    if (cshow !== undefined) {
      setShowCampaigns(true);
    }
  }, []);

  // Comunicação entre iframe e página pai
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'iframeResize') {
        // Ajusta o tamanho do iframe quando necessário
        if (iframeRef.current) {
          iframeRef.current.style.height = event.data.height + 'px';
        }
      } else if (event.data.type === 'iframeLoaded') {
        // Quando o iframe carrega, ajusta o tamanho
        if (iframeRef.current) {
          iframeRef.current.style.height = event.data.height + 'px';
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
	  <ForwardMessageProvider>
        <TicketsContextProvider>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
			<Route exact path="/forgetpsw" component={ForgetPassword} /> 
            {/* <Route exact path="/create-company" component={Companies} /> */}
            <WhatsAppsProvider>
              <LoggedInLayout>
                <Route exact path="/" component={Dashboard} isPrivate />
                <Route
                  exact
                  path="/tickets/:ticketId?"
                  component={TicketResponsiveContainer}
                  isPrivate
                />
                <Route
                  exact
                  path="/connections"
                  component={Connections}
                  isPrivate
                />
                <Route
                  exact
                  path="/quick-messages"
                  component={QuickMessages}
                  isPrivate
                />
                <Route
                  exact
                  path="/todolist"
                  component={ToDoList}
                  isPrivate
                  />
                <Route
                  exact
                  path="/schedules"
                  component={Schedules}
                  isPrivate
                />
                <Route exact path="/tags" component={Tags} isPrivate />
                <Route exact path="/contacts" component={Contacts} isPrivate />
                <Route exact path="/helps" component={Helps} isPrivate />
                <Route exact path="/users" component={Users} isPrivate />
                <Route exact path="/files" component={Files} isPrivate />
                <Route exact path="/prompts" component={Prompts} isPrivate />
                <Route exact path="/LogLauncher" component={LogLauncher} isPrivate />
                <Route exact path="/queue-integration" component={QueueIntegration} isPrivate />
                {/*<Route exact path="/kanban-schedules" component={kanbanSchedules} isPrivate />*/}
                <Route
                  exact
                  path="/messages-api"
                  component={MessagesAPI}
                  isPrivate
                />
                <Route
                  exact
                  path="/settings"
                  component={SettingsCustom}
                  isPrivate
                />
				        <Route 
                  exact
                  path="/kanban"
                  component={Kanban}
                  isPrivate
                />
				<Route
                  exact
                  path="/relatorios"
                  component={Relatorios}
                  isPrivate
                />				
                <Route
                  exact
                  path="/financeiro"
                  component={Financeiro}
                  isPrivate
                />
                <Route exact path="/queues" component={Queues} isPrivate />
                <Route
                  exact
                  path="/announcements"
                  component={Annoucements}
                  isPrivate
                />
                <Route
                  exact
                  path="/subscription"
                  component={Subscription}
                  isPrivate
                />
                <Route exact path="/chats/:id?" component={Chat} isPrivate />
                {showCampaigns && (
                  <>
                    <Route
                      exact
                      path="/contact-lists"
                      component={ContactLists}
                      isPrivate
                    />
                    <Route
                      exact
                      path="/contact-lists/:contactListId/contacts"
                      component={ContactListItems}
                      isPrivate
                    />
                    <Route
                      exact
                      path="/campaigns"
                      component={Campaigns}
                      isPrivate
                    />
                    <Route
                      exact
                      path="/campaign/:campaignId/report"
                      component={CampaignReport}
                      isPrivate
                    />
                    <Route
                      exact
                      path="/campaigns-config"
                      component={CampaignsConfig}
                      isPrivate
                    />
                  </>
                )}
              </LoggedInLayout>
            </WhatsAppsProvider>
          </Switch>
          <ToastContainer autoClose={3000} />
        </TicketsContextProvider>
		</ForwardMessageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
