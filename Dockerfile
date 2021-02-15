# Step 1 Download from Github
FROM alpine/git as download-step
LABEL maintainer "Rafael Fonseca <rfonseca85@yahoo.ca>"
#Download and build Frontend
RUN mkdir /home/jahia-contacts
RUN cd /home/jahia-contacts 
RUN git clone https://github.com/rfonseca85/jahia-contacts.git /home/jahia-contacts

# Step 3 Build & Run Frontend
FROM node:14 as build-frontend-step
EXPOSE 3000
RUN mkdir /home/jahia-contacts
COPY --from=download-step /home/jahia-contacts /home/jahia-contacts
WORKDIR /home/jahia-contacts
# RUN npm install -g npm@7.5.4
RUN npm install
ENTRYPOINT ["npm","run","start"]
