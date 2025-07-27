# SkillSync Deployment Guide

This guide covers deploying the SkillSync AI-Powered Task Matcher application to various platforms.

## Prerequisites

- Node.js 16+ installed
- MongoDB database (local or cloud)
- Git repository access
- Environment variables configured

## Environment Setup

1. Copy the environment example file:
   ```bash
   cp env.example .env
   ```

2. Configure your environment variables in `.env`:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=production
   
   # Database Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillsync
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Client Configuration
   CLIENT_URL=https://your-domain.com
   ```

## Local Development

1. Install dependencies:
   ```bash
   npm run install-all
   ```

2. Start the development servers:
   ```bash
   npm run dev
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Production Deployment

### Option 1: Vercel (Recommended for Frontend)

#### Frontend Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to the client directory:
   ```bash
   cd client
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

4. Configure environment variables in Vercel dashboard:
   - `REACT_APP_API_URL` - Your backend API URL

#### Backend Deployment

1. Deploy to Vercel or Railway:
   ```bash
   cd server
   vercel
   ```

2. Configure environment variables in Vercel dashboard

### Option 2: Railway

1. Connect your GitHub repository to Railway
2. Configure environment variables in Railway dashboard
3. Deploy both client and server

### Option 3: Heroku

#### Frontend Deployment

1. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```

2. Add buildpack:
   ```bash
   heroku buildpacks:set mars/create-react-app
   ```

3. Deploy:
   ```bash
   git push heroku main
   ```

#### Backend Deployment

1. Create a new Heroku app:
   ```bash
   heroku create your-api-name
   ```

2. Add MongoDB addon:
   ```bash
   heroku addons:create mongolab
   ```

3. Configure environment variables:
   ```bash
   heroku config:set JWT_SECRET=your-secret-key
   heroku config:set NODE_ENV=production
   ```

4. Deploy:
   ```bash
   git push heroku main
   ```

### Option 4: DigitalOcean App Platform

1. Connect your GitHub repository
2. Configure build settings:
   - Frontend: Build command: `npm run build`
   - Backend: Build command: `npm install`
3. Set environment variables
4. Deploy

### Option 5: AWS

#### Using AWS Elastic Beanstalk

1. Install AWS CLI and EB CLI
2. Initialize EB application:
   ```bash
   eb init
   ```

3. Create environment:
   ```bash
   eb create production
   ```

4. Deploy:
   ```bash
   eb deploy
   ```

#### Using AWS ECS with Docker

1. Create Dockerfile for backend:
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   EXPOSE 5000
   CMD ["npm", "start"]
   ```

2. Build and push Docker image
3. Create ECS cluster and service
4. Configure load balancer

## Database Setup

### MongoDB Atlas (Recommended)

1. Create MongoDB Atlas account
2. Create a new cluster
3. Configure network access (IP whitelist)
4. Create database user
5. Get connection string
6. Update `MONGODB_URI` in environment variables

### Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Create database:
   ```bash
   mongo
   use skillsync
   ```

## SSL/HTTPS Configuration

### Using Let's Encrypt

1. Install Certbot
2. Obtain SSL certificate:
   ```bash
   sudo certbot certonly --standalone -d your-domain.com
   ```

3. Configure your web server (Nginx/Apache)

### Using Cloudflare

1. Add your domain to Cloudflare
2. Update DNS records
3. Enable SSL/TLS encryption mode

## Monitoring and Logging

### Application Monitoring

1. Set up error tracking (Sentry):
   ```bash
   npm install @sentry/node
   ```

2. Configure Sentry in your application

### Logging

1. Set up structured logging:
   ```bash
   npm install winston
   ```

2. Configure log rotation and storage

### Performance Monitoring

1. Set up New Relic or DataDog
2. Monitor API response times
3. Set up alerts for errors

## Security Considerations

### Environment Variables

- Never commit `.env` files to version control
- Use different secrets for development and production
- Rotate JWT secrets regularly

### API Security

- Enable CORS properly
- Implement rate limiting
- Validate all inputs
- Use HTTPS in production

### Database Security

- Use strong passwords
- Enable MongoDB authentication
- Restrict network access
- Regular backups

## Backup Strategy

### Database Backups

1. Set up automated MongoDB backups
2. Store backups in multiple locations
3. Test backup restoration regularly

### Application Backups

1. Version control all code
2. Document configuration changes
3. Keep deployment scripts in version control

## Scaling Considerations

### Horizontal Scaling

1. Use load balancers
2. Implement session management
3. Use Redis for caching

### Database Scaling

1. Implement read replicas
2. Use database sharding if needed
3. Optimize queries and indexes

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check CORS configuration
2. **Database Connection**: Verify MongoDB URI
3. **JWT Issues**: Check JWT secret configuration
4. **Build Failures**: Check Node.js version compatibility

### Debug Mode

Enable debug logging:
```bash
DEBUG=* npm start
```

### Health Checks

Monitor application health:
```bash
curl https://your-api.com/api/health
```

## Maintenance

### Regular Tasks

1. Update dependencies monthly
2. Monitor security advisories
3. Review and rotate secrets
4. Check application performance
5. Update SSL certificates

### Updates

1. Test updates in staging environment
2. Use blue-green deployment strategy
3. Monitor application after updates
4. Rollback plan ready

## Support

For deployment issues:

1. Check application logs
2. Verify environment variables
3. Test database connectivity
4. Review security group/firewall settings
5. Contact platform support if needed

## Cost Optimization

### Cloud Resources

1. Use appropriate instance sizes
2. Enable auto-scaling
3. Use reserved instances for predictable workloads
4. Monitor and optimize resource usage

### Database

1. Choose appropriate MongoDB tier
2. Optimize queries to reduce costs
3. Use connection pooling
4. Monitor database usage

---

**Note**: This deployment guide covers the most common scenarios. Adjust based on your specific requirements and infrastructure preferences. 